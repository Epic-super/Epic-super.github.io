# FOLOTOY NFC 互动打卡 + Token 兑换系统

基于 FOLOTOY 八爪鱼硬件 + NFC 模块实现的现场互动原型，复刻 TRAE AI 创造力大赛决赛现场通行证的核心玩法。

## 系统架构

```
┌─────────────────┐     WiFi/MQTT      ┌──────────────────┐
│  FOLOTOY 设备   │ ◄────────────────► │   Node.js 后端    │
│  (NFC打卡交互)   │                    │  (API + 业务逻辑) │
└─────────────────┘                    └──────────────────┘
         ▲                                       │
         │ NFC触碰                                │ SQLite
         │                                       ▼
┌─────────────────┐                    ┌──────────────────┐
│  NFC 展位标签   │                    │   本地数据库      │
│  (固定打卡点)   │                    │  (设备/打卡/兑换) │
└─────────────────┘                    └──────────────────┘
```

## 核心功能

- NFC 现场打卡并发放 Token
- 同一设备/同一展位每日次数限制
- Token 余额查询与交易流水
- 奖品兑换与库存管理
- 设备端语音反馈与灯光提示
- 管理后台查看统计和记录

## 硬件清单

- FOLOTOY 八爪鱼标准版或 Mini 版
- PN532 / PN7150 NFC 读写模块
- 展位 NFC 标签（建议 NTAG213/215）
- Type-C 数据线、杜邦线、面包板或扩展板
- 可选：自定义外壳、RGB 灯带、小喇叭

## 快速开始

### 方式一：本地 Node.js 直接运行

```bash
cd backend
npm install
npm run init-db
npm start
```

访问管理后台：http://localhost:3000/web

### 方式二：Docker 一键部署

```bash
# Windows
deploy.bat your-admin-api-key

# Linux/macOS
./deploy.sh your-admin-api-key
```

访问管理后台：http://localhost/web

## 演示数据脚本

### 1. 生成演示数据

```bash
cd backend
npm run init-db
node src/scripts/seed-demo-data.js
```

这将创建：
- 3 个演示设备
- 4 个 NFC 展位标签
- 4 个可兑换奖品（含1个缺货奖品）

### 2. 运行测试用例

```bash
cd backend
npm test
```

测试覆盖：
- 健康检查
- NFC 打卡成功/失败场景
- 重复打卡限制
- Token 余额查询
- 奖品兑换成功/失败
- 管理后台统计
- 完整用户旅程演示

### 3. 快速演示流程

```bash
cd backend
node src/scripts/run-demo.js
```

## API 接口文档

详见 [docs/api.md](docs/api.md)

## 设备端交互流程

详见 [docs/device-flow.md](docs/device-flow.md)

## 项目结构

```
folotoy-nfc-passport/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express 主服务
│   │   ├── config/
│   │   │   └── database.js        # SQLite 数据库连接
│   │   ├── routes/
│   │   │   ├── nfc.js             # NFC 打卡路由
│   │   │   ├── token.js           # Token 查询路由
│   │   │   ├── rewards.js         # 奖品兑换路由
│   │   │   ├── admin.js           # 管理后台路由
│   │   │   └── web.js             # Web 页面路由
│   │   ├── services/
│   │   │   ├── mqtt-service.js    # MQTT 实时推送
│   │   │   └── websocket-service.js # WebSocket 服务
│   │   ├── public/
│   │   │   └── index.html         # 管理后台页面
│   │   └── scripts/
│   │       ├── init-db.js         # 初始化数据库
│   │       ├── seed-demo-data.js  # 生成演示数据
│   │       └── run-demo.js        # 运行完整演示
│   ├── tests/
│   │   └── nfc-passport.test.js   # API 测试用例
│   ├── Dockerfile                 # Docker 镜像
│   └── package.json
├── device/
│   └── nfc_test.py               # 设备端 Python 测试脚本
├── docker-compose.yml            # Docker Compose 配置
├── deploy.sh / deploy.bat        # 部署脚本
└── README.md
```

## 设备端对接方式

设备端可以选择以下任一方式与后端通信：

### 方式一：HTTP REST API

```bash
# 打卡
curl -X POST http://localhost:3000/api/nfc/checkin \
  -H "Content-Type: application/json" \
  -d '{"device_id": "device-001", "tag_uid": "04A224B33C01"}'

# 查询余额
curl http://localhost:3000/api/token/balance/device-001

# 获取奖品列表
curl http://localhost:3000/api/rewards

# 兑换奖品
curl -X POST http://localhost:3000/api/rewards/redeem \
  -H "Content-Type: application/json" \
  -d '{"device_id": "device-001", "reward_id": 1}'
```

### 方式二：WebSocket

连接 `ws://localhost:8080`，发送 JSON 消息：

```json
{
  "type": "nfc_detected",
  "tag_uid": "04A224B33C01"
}
```

### 方式三：MQTT

订阅 `folotoy/nfc/{device_id}/response`，发布到 `folotoy/nfc/{device_id}/request`：

```json
{
  "type": "nfc_checkin",
  "tag_uid": "04A224B33C01"
}
```

## 后续扩展建议

- 增加 MQTT 实时推送，让设备端收到 Token 到账提醒
- 增加展位后台二维码，观众扫码可查看活动规则
- 增加排行榜、成就徽章等游戏化机制
- 对接小票打印机，兑换后自动打印凭证
- 增加 Redis 缓存提升并发性能
- 增加用户端小程序/H5 查询页

## License

MIT
