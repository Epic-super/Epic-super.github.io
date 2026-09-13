# FOLOTOY NFC Passport 设备端固件

基于 ESP-IDF 的 FOLOTOY 设备端固件，用于实现 NFC 互动打卡、Token 兑换和设备联动。

## 硬件要求

- ESP32-S3 / ESP32 主控板
- PN532 / PN7150 NFC 模块（I2C 接口）
- 麦克风 + 扬声器（可选，用于语音反馈）
- RGB LED（可选，用于灯光反馈）
- 按键（可选，用于手动触发）
- Type-C 供电与调试口

## 软件环境

- ESP-IDF v5.1+
- Python 3.8+
- CMake 3.16+
- 串口驱动（CH340 / CP210x）

## 目录结构

```
firmware/
├── CMakeLists.txt
├── main/
│   ├── CMakeLists.txt
│   ├── main.cpp
│   ├── config.h
│   └── config.cpp
├── components/
│   ├── nfc_manager/
│   ├── at_command_handler/
│   ├── network_manager/
│   ├── passport_controller/
│   ├── offline_cache/
│   ├── ota_manager/
│   ├── ble_provisioning/
│   └── hal/
│       ├── audio_manager.h
│       ├── led_controller.h
│       └── button_manager.h
├── build.sh
└── build.cmd
```

## 编译步骤

### 1. 安装 ESP-IDF

```bash
# 参考官方文档安装 ESP-IDF
# https://docs.espressif.com/projects/esp-idf/zh_CN/latest/esp32/get-started/
```

### 2. 克隆项目并进入固件目录

```bash
cd folotoy-nfc-passport/firmware
```

### 3. 配置项目

```bash
idf.py menuconfig
```

关键配置项：
- Serial flasher config -> Flash size
- Component config -> NFC
- Component config -> WiFi

### 4. 编译

```bash
# Linux/macOS
./build.sh /dev/ttyUSB0

# Windows
build.cmd COM3
```

## 烧录

```bash
# 查看端口
idf.py list-ports

# 烧录
idf.py -p COM3 flash

# 监视日志
idf.py -p COM3 monitor
```

## 通信协议

设备端支持三种通信方式：

### 1. HTTP REST API

```cpp
// 打卡
network_manager_http_post("/api/nfc/checkin", json_body, handler, 5000);

// 查询余额
network_manager_http_get("/api/token/balance/device-001", handler, 5000);

// 兑换奖品
network_manager_http_post("/api/rewards/redeem", json_body, handler, 5000);
```

### 2. MQTT

```cpp
// 启动 MQTT
network_manager_mqtt_start(mqtt_event_handler);

// 发布消息
network_manager_mqtt_publish("folotoy/nfc/device-001/request", payload, len);
```

### 3. WebSocket

```cpp
// 启动 WebSocket
network_manager_ws_start(ws_event_handler);

// 发送消息
network_manager_ws_send(data, len);
```

## 业务逻辑

### NFC 打卡流程

1. NFC 标签靠近设备
2. `nfc_manager` 读取 UID
3. `passport_controller` 构造 JSON 请求
4. `network_manager` 发送 HTTP POST
5. 后端返回打卡结果
6. `audio_manager` 播放语音提示
7. `led_controller` 显示灯光反馈

### 离线缓存

当网络不可用时，打卡和兑换请求会写入 NVS 离线缓存队列，待网络恢复后自动同步：

```cpp
// 业务层自动判断网络状态并缓存
if (!s_network_available) {
    offline_cache_add("nfc_checkin", payload);
}
```

同步任务每 5 秒尝试重放一次 PENDING/FAILED 请求，并支持事件回调：

```cpp
offline_cache_register_event_cb([](const offline_cache_entry_t *entry, offline_cache_status_t status){
    ESP_LOGI(TAG, "sync status=%d", status);
});
```

### OTA 升级

设备支持 HTTPS OTA 升级，包含版本检查、下载、烧录和回滚：

```cpp
ota_manager_set_event_cb([](ota_status_t status, ota_error_t error, const char *message){
    ESP_LOGI(TAG, "OTA status=%d error=%d msg=%s", status, error, message);
});
ota_manager_set_progress_cb([](uint32_t downloaded_bytes, uint32_t total_bytes){
    ESP_LOGI(TAG, "OTA progress %u/%u", downloaded_bytes, total_bytes);
});
```

长按按键（3-7秒）可手动触发配网模式，长按（>7秒）触发 OTA 检查。OTA 状态会通过 LED 和音频给出反馈。

### BLE 配网

当设备未配置 WiFi 时，上电会自动进入 BLE 配网模式。设备会广播名为 `FOLOTOY_XXXX` 的 BLE 服务，手机/电脑可以通过蓝牙发送 WiFi 凭证。

配网流程：
1. 设备上电，检查 NVS 中是否有 WiFi 配置
2. 如果没有，启动 BLE 广播，名称格式为 `FOLOTOY_XXXX`（后三位为 BT MAC 后三字节）
3. 手机扫描到设备并连接
4. 向 Service UUID `0xFFFF` 写入：
   - Characteristic `0xFF01`：WiFi SSID
   - Characteristic `0xFF02`：WiFi Password
5. 设备尝试连接 WiFi，并通过 Characteristic `0xFF03` 通知连接状态
6. 连接成功后保存配置并重启

### 配网 App

项目提供了基于 Web Bluetooth 的配网页面，位于 `backend/src/public/provision.html`。

使用方式：
1. 确保设备处于配网模式（蓝灯闪烁）
2. 用 Chrome/Edge 浏览器打开配网页面
3. 点击"扫描 BLE 设备"并选择 `FOLOTOY_XXXX`
4. 输入 WiFi 名称和密码，点击"连接 WiFi"
5. 等待设备提示配网成功

**注意**：Web Bluetooth API 需要 HTTPS 环境或 localhost，部分浏览器可能不支持。

### 业务控制器事件

```cpp
typedef enum {
    PASSPORT_EVENT_CHECKIN_SUCCESS = 0,
    PASSPORT_EVENT_CHECKIN_FAILED = 1,
    PASSPORT_EVENT_REDEEM_SUCCESS = 2,
    PASSPORT_EVENT_REDEEM_FAILED = 3,
    PASSPORT_EVENT_NETWORK_ERROR = 4,
    PASSPORT_EVENT_INVALID_TAG = 5
} passport_event_type_t;
```

## HAL 接口

### 音频管理

```cpp
audio_manager_init();
audio_manager_play_event(AUDIO_EVENT_CHECKIN_SUCCESS);
audio_manager_set_volume(80);
```

### LED 控制

```cpp
led_controller_init();
led_pattern_t pattern = {
    .color = LED_COLOR_GREEN,
    .mode = LED_MODE_BLINK,
    .on_ms = 200,
    .off_ms = 200,
    .brightness = 100
};
led_controller_set_pattern(&pattern);
```

### 按键管理

```cpp
button_manager_init(button_event_handler);
bool pressed = button_manager_is_pressed();
uint32_t duration = button_manager_get_last_press_duration();
```

## AT 指令接口

```cpp
at_response_t resp;
at_status_t status = at_command_send("AT+COMMAND=reboot", &resp, 5000);
```

## 配置文件

设备配置通过 NVS 存储，初始化时加载：

```cpp
nfc_passport_config_t config;
nfc_passport_config_get(&config);
```

默认配置：
- WiFi SSID: YOUR_WIFI_SSID
- API Base: http://localhost:3000/api
- MQTT URI: mqtt://localhost:1883
- MQTT Topic Prefix: folotoy/nfc

## 调试

```bash
# 查看串口日志
idf.py -p COM3 monitor

# 查看分区表
idf.py -p COM3 partition-table

# 擦除 Flash
idf.py -p COM3 erase-flash
```

## 常见问题

1. **编译错误：找不到头文件**
   - 确保已安装 ESP-IDF 并正确设置 IDF_PATH
   - 运行 `idf.py install-deps`

2. **烧录失败**
   - 检查串口驱动是否安装
   - 确认设备进入下载模式（GPIO0 拉低）

3. **NFC 不响应**
   - 检查 I2C 接线
   - 确认 NFC 模块 I2C 地址
   - 查看串口日志中的错误信息

## 后续扩展

- 增加低功耗模式
- 增加多语言语音提示

## License

MIT
