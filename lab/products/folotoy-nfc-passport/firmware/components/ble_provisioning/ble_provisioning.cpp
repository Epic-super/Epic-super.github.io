#include "ble_provisioning.h"
#include "config.h"
#include "esp_log.h"
#include "esp_bt.h"
#include "esp_bt_main.h"
#include "esp_gap_ble.h"
#include "esp_gatts.h"
#include "esp_gatt_defs.h"
#include "esp_wifi.h"
#include "esp_wifi_types.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "string.h"

static const char *TAG = "ble_prov";

#define BLE_PROV_SERVICE_UUID    0xFFFF
#define BLE_PROV_CHAR_SSID_UUID  0xFF01
#define BLE_PROV_CHAR_PASS_UUID  0xFF02
#define BLE_PROV_CHAR_STAT_UUID  0xFF03

static bool s_initialized = false;
static bool s_started = false;
static ble_prov_status_t s_status = BLE_PROV_STATUS_IDLE;
static ble_prov_event_cb_t s_event_cb = NULL;
static uint16_t s_service_handle = 0;
static uint16_t s_ssid_handle = 0;
static uint16_t s_pass_handle = 0;
static uint16_t s_status_handle = 0;
static uint16_t s_conn_id = 0;
static bool s_connected = false;
static char s_ssid[33] = {0};
static char s_password[65] = {0};
static esp_gatt_if_t s_gatts_if = 0;

static void set_status(ble_prov_status_t status, ble_prov_error_t error, const char *message) {
    s_status = status;
    if (s_event_cb) {
        s_event_cb(status, error, message);
    }
}

static esp_err_t notify_status(const char *message) {
    if (!s_connected || s_status_handle == 0) {
        return ESP_ERR_INVALID_STATE;
    }

    uint8_t buf[64] = {0};
    strncpy((char *)buf, message, sizeof(buf) - 1);

    esp_gatt_status_t ret = esp_ble_gatts_send_indicate(s_gatts_if, s_conn_id, s_status_handle,
                                                        strlen((char *)buf), buf, false);
    if (ret != ESP_GATT_OK) {
        ESP_LOGE(TAG, "Failed to send indication: %d", ret);
        return ESP_FAIL;
    }
    return ESP_OK;
}

static void wifi_event_handler(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data) {
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        ESP_LOGI(TAG, "WiFi started, connecting to SSID: %s", s_ssid);
        esp_wifi_connect();
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        ESP_LOGW(TAG, "WiFi disconnected");
        notify_status("WiFi disconnected");
        set_status(BLE_PROV_STATUS_FAILED, BLE_PROV_ERROR_WIFI, "WiFi disconnected");
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        ESP_LOGI(TAG, "WiFi connected, got IP");
        notify_status("WiFi connected");

        nfc_passport_config_t config;
        nfc_passport_config_get(&config);
        strncpy(config.wifi_ssid, s_ssid, sizeof(config.wifi_ssid) - 1);
        strncpy(config.wifi_password, s_password, sizeof(config.wifi_password) - 1);
        nfc_passport_config_set(&config);
        nfc_passport_config_save();

        set_status(BLE_PROV_STATUS_SUCCESS, BLE_PROV_ERROR_NONE, "Provisioning success");
        ble_provisioning_stop();
    }
}

static esp_err_t try_connect_wifi(void) {
    set_status(BLE_PROV_STATUS_PROVISIONING, BLE_PROV_ERROR_NONE, "Connecting to WiFi");

    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &wifi_event_handler, NULL));

    wifi_config_t wifi_cfg = {};
    strncpy((char *)wifi_cfg.sta.ssid, s_ssid, sizeof(wifi_cfg.sta.ssid));
    strncpy((char *)wifi_cfg.sta.password, s_password, sizeof(wifi_cfg.sta.password));

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_cfg));
    ESP_ERROR_CHECK(esp_wifi_start());

    return ESP_OK;
}

static void gatts_profile_event_handler(esp_gatts_cb_event_t event, esp_gatt_if_t gatts_if,
                                        esp_ble_gatts_cb_param_t *param) {
    switch (event) {
        case ESP_GATTS_CONNECT_EVT:
            ESP_LOGI(TAG, "BLE connected, conn_id=%d", param->connect.conn_id);
            s_conn_id = param->connect.conn_id;
            s_connected = true;
            set_status(BLE_PROV_STATUS_CONNECTED, BLE_PROV_ERROR_NONE, "Connected");
            notify_status("Connected to FOLOTOY device");
            break;

        case ESP_GATTS_DISCONNECT_EVT:
            ESP_LOGI(TAG, "BLE disconnected");
            s_connected = false;
            s_conn_id = 0;
            if (s_status != BLE_PROV_STATUS_SUCCESS) {
                set_status(BLE_PROV_STATUS_ADVERTISING, BLE_PROV_ERROR_NONE, "Advertising again");
            }
            break;

        case ESP_GATTS_WRITE_EVT: {
            if (!param->write.len || param->write.len > 64) {
                if (param->write.need_rsp) {
                    esp_ble_gatts_send_response(gatts_if, param->write.conn_id, param->write.trans_id,
                                                ESP_GATT_INVALID_ATTR_LEN, NULL);
                }
                break;
            }

            char buf[65] = {0};
            memcpy(buf, param->write.value, param->write.len);
            buf[param->write.len] = 0;

            if (param->write.handle == s_ssid_handle) {
                strncpy(s_ssid, buf, sizeof(s_ssid) - 1);
                ESP_LOGI(TAG, "Received SSID: %s", s_ssid);
                notify_status("SSID received");
            } else if (param->write.handle == s_pass_handle) {
                strncpy(s_password, buf, sizeof(s_password) - 1);
                ESP_LOGI(TAG, "Received password length: %d", strlen(s_password));
                notify_status("Password received, connecting...");

                if (strlen(s_ssid) > 0) {
                    try_connect_wifi();
                }
            }

            if (param->write.need_rsp) {
                esp_ble_gatts_send_response(gatts_if, param->write.conn_id, param->write.trans_id,
                                            ESP_GATT_OK, NULL);
            }
            break;
        }

        default:
            break;
    }
}

static void gatts_event_handler(esp_gatts_cb_event_t event, esp_gatt_if_t gatts_if,
                                esp_ble_gatts_cb_param_t *param) {
    if (event == ESP_GATTS_REG_EVT) {
        if (param->reg.status == ESP_GATT_OK) {
            s_gatts_if = gatts_if;
            esp_gatt_srvc_id_t srvc_id = {
                .is_primary = true,
                .id = {.uuid = {.len = ESP_UUID_LEN_16, .uuid16 = BLE_PROV_SERVICE_UUID}, .inst_id = 0}
            };
            esp_ble_gatts_create_service(gatts_if, &srvc_id, 4);
        }
    } else if (gatts_if == ESP_GATT_IF_NONE || gatts_if == s_gatts_if) {
        gatts_profile_event_handler(event, gatts_if, param);
    }
}

static void gap_event_handler(esp_gap_ble_cb_event_t event, esp_ble_gap_cb_param_t *param) {
    switch (event) {
        case ESP_GAP_BLE_ADV_DATA_SET_COMPLETE_EVT:
            ESP_LOGI(TAG, "Advertising data set complete");
            set_status(BLE_PROV_STATUS_ADVERTISING, BLE_PROV_ERROR_NONE, "Advertising");
            esp_ble_gap_start_advertising(&(esp_ble_adv_params_t){
                .adv_int_min = 0x20,
                .adv_int_max = 0x40,
                .adv_type = ADV_TYPE_IND,
                .own_addr_type = BLE_ADDR_TYPE_PUBLIC,
                .channel_map = ADV_CHNL_ALL,
                .adv_filter_policy = ADV_FILTER_ALLOW_SCAN_ANY_CON_ANY
            });
            break;

        case ESP_GAP_BLE_SCAN_RSP_DATA_SET_COMPLETE_EVT:
            ESP_LOGI(TAG, "Scan response data set complete");
            break;

        default:
            break;
    }
}

static void service_created(const esp_ble_gatts_cb_param_t::gatts_create_evt_param_t *create_param) {
    s_service_handle = create_param->service_handle;
    esp_ble_gatts_start_service(s_service_handle);

    esp_att_char_props_t props = ESP_GATT_CHAR_PROP_BIT_WRITE;
    esp_ble_gatts_add_char(s_service_handle, &(esp_bt_uuid_t){.len = ESP_UUID_LEN_16, .uuid16 = BLE_PROV_CHAR_SSID_UUID},
                           ESP_GATT_PERM_WRITE, props, NULL, NULL);
}

static void char_added(const esp_ble_gatts_cb_param_t::gatts_add_char_evt_param_t *add_char_param) {
    if (add_char_param->char_uuid.uuid16 == BLE_PROV_CHAR_SSID_UUID) {
        s_ssid_handle = add_char_param->attr_handle;
        esp_att_char_props_t props = ESP_GATT_CHAR_PROP_BIT_WRITE;
        esp_ble_gatts_add_char(s_service_handle, &(esp_bt_uuid_t){.len = ESP_UUID_LEN_16, .uuid16 = BLE_PROV_CHAR_PASS_UUID},
                               ESP_GATT_PERM_WRITE, props, NULL, NULL);
    } else if (add_char_param->char_uuid.uuid16 == BLE_PROV_CHAR_PASS_UUID) {
        s_pass_handle = add_char_param->attr_handle;
        esp_att_char_props_t props = ESP_GATT_CHAR_PROP_BIT_NOTIFY;
        esp_ble_gatts_add_char(s_service_handle, &(esp_bt_uuid_t){.len = ESP_UUID_LEN_16, .uuid16 = BLE_PROV_CHAR_STAT_UUID},
                               ESP_GATT_PERM_READ, props, NULL, NULL);
    } else if (add_char_param->char_uuid.uuid16 == BLE_PROV_CHAR_STAT_UUID) {
        s_status_handle = add_char_param->attr_handle;
    }
}

static void gatts_event_handler_ext(esp_gatts_cb_event_t event, esp_gatt_if_t gatts_if,
                                    esp_ble_gatts_cb_param_t *param) {
    switch (event) {
        case ESP_GATTS_REG_EVT:
            if (param->reg.status == ESP_GATT_OK) {
                s_gatts_if = gatts_if;
                esp_gatt_srvc_id_t srvc_id = {
                    .is_primary = true,
                    .id = {.uuid = {.len = ESP_UUID_LEN_16, .uuid16 = BLE_PROV_SERVICE_UUID}, .inst_id = 0}
                };
                esp_ble_gatts_create_service(gatts_if, &srvc_id, 4);
            }
            break;

        case ESP_GATTS_CREATE_EVT:
            service_created(&param->create);
            break;

        case ESP_GATTS_ADD_CHAR_EVT:
            char_added(&param->add_char);
            break;

        case ESP_GATTS_CONNECT_EVT:
            ESP_LOGI(TAG, "BLE connected, conn_id=%d", param->connect.conn_id);
            s_conn_id = param->connect.conn_id;
            s_connected = true;
            set_status(BLE_PROV_STATUS_CONNECTED, BLE_PROV_ERROR_NONE, "Connected");
            notify_status("Connected to FOLOTOY device");
            break;

        case ESP_GATTS_DISCONNECT_EVT:
            ESP_LOGI(TAG, "BLE disconnected");
            s_connected = false;
            s_conn_id = 0;
            if (s_status != BLE_PROV_STATUS_SUCCESS) {
                set_status(BLE_PROV_STATUS_ADVERTISING, BLE_PROV_ERROR_NONE, "Advertising again");
            }
            break;

        case ESP_GATTS_WRITE_EVT: {
            if (!param->write.len || param->write.len > 64) {
                if (param->write.need_rsp) {
                    esp_ble_gatts_send_response(gatts_if, param->write.conn_id, param->write.trans_id,
                                                ESP_GATT_INVALID_ATTR_LEN, NULL);
                }
                break;
            }

            char buf[65] = {0};
            memcpy(buf, param->write.value, param->write.len);
            buf[param->write.len] = 0;

            if (param->write.handle == s_ssid_handle) {
                strncpy(s_ssid, buf, sizeof(s_ssid) - 1);
                ESP_LOGI(TAG, "Received SSID: %s", s_ssid);
                notify_status("SSID received");
            } else if (param->write.handle == s_pass_handle) {
                strncpy(s_password, buf, sizeof(s_password) - 1);
                ESP_LOGI(TAG, "Received password length: %d", strlen(s_password));
                notify_status("Password received, connecting...");

                if (strlen(s_ssid) > 0) {
                    try_connect_wifi();
                }
            }

            if (param->write.need_rsp) {
                esp_ble_gatts_send_response(gatts_if, param->write.conn_id, param->write.trans_id,
                                            ESP_GATT_OK, NULL);
            }
            break;
        }

        default:
            break;
    }
}

static void gap_event_handler_ext(esp_gap_ble_cb_event_t event, esp_ble_gap_cb_param_t *param) {
    switch (event) {
        case ESP_GAP_BLE_ADV_DATA_SET_COMPLETE_EVT:
            ESP_LOGI(TAG, "Advertising data set complete");
            set_status(BLE_PROV_STATUS_ADVERTISING, BLE_PROV_ERROR_NONE, "Advertising");
            esp_ble_gap_start_advertising(&(esp_ble_adv_params_t){
                .adv_int_min = 0x20,
                .adv_int_max = 0x40,
                .adv_type = ADV_TYPE_IND,
                .own_addr_type = BLE_ADDR_TYPE_PUBLIC,
                .channel_map = ADV_CHNL_ALL,
                .adv_filter_policy = ADV_FILTER_ALLOW_SCAN_ANY_CON_ANY
            });
            break;

        case ESP_GAP_BLE_SCAN_RSP_DATA_SET_COMPLETE_EVT:
            ESP_LOGI(TAG, "Scan response data set complete");
            break;

        default:
            break;
    }
}

esp_err_t ble_provisioning_init(ble_prov_event_cb_t cb) {
    if (s_initialized) {
        return ESP_OK;
    }

    s_event_cb = cb;
    s_status = BLE_PROV_STATUS_IDLE;
    s_started = false;
    s_connected = false;
    s_conn_id = 0;
    s_service_handle = 0;
    s_ssid_handle = 0;
    s_pass_handle = 0;
    s_status_handle = 0;
    s_gatts_if = 0;
    memset(s_ssid, 0, sizeof(s_ssid));
    memset(s_password, 0, sizeof(s_password));

    ESP_LOGI(TAG, "BLE provisioning initialized");
    s_initialized = true;
    return ESP_OK;
}

esp_err_t ble_provisioning_deinit(void) {
    ble_provisioning_stop();
    s_initialized = false;
    s_event_cb = NULL;
    return ESP_OK;
}

esp_err_t ble_provisioning_start(void) {
    if (!s_initialized || s_started) {
        return ESP_ERR_INVALID_STATE;
    }

    ESP_LOGI(TAG, "Starting BLE provisioning");

    esp_bt_controller_mem_release(ESP_BT_MODE_CLASSIC_BT);

    esp_bt_controller_config_t bt_cfg = BT_CONTROLLER_INIT_CONFIG_DEFAULT();
    esp_err_t err = esp_bt_controller_init(&bt_cfg);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "BT controller init failed: %s", esp_err_to_name(err));
        set_status(BLE_PROV_STATUS_FAILED, BLE_PROV_ERROR_BLE, "BT controller init failed");
        return err;
    }

    err = esp_bt_controller_enable(ESP_BT_MODE_BLE);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "BT controller enable failed: %s", esp_err_to_name(err));
        set_status(BLE_PROV_STATUS_FAILED, BLE_PROV_ERROR_BLE, "BT enable failed");
        return err;
    }

    err = esp_bluedroid_init();
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Bluedroid init failed: %s", esp_err_to_name(err));
        set_status(BLE_PROV_STATUS_FAILED, BLE_PROV_ERROR_BLE, "Bluedroid init failed");
        return err;
    }

    err = esp_bluedroid_enable();
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Bluedroid enable failed: %s", esp_err_to_name(err));
        set_status(BLE_PROV_STATUS_FAILED, BLE_PROV_ERROR_BLE, "Bluedroid enable failed");
        return err;
    }

    ESP_ERROR_CHECK(esp_ble_gatts_register_callback(gatts_event_handler_ext));
    ESP_ERROR_CHECK(esp_ble_gap_register_callback(gap_event_handler_ext));

    char dev_name[32] = {0};
    uint8_t mac[6] = {0};
    esp_read_mac(mac, ESP_MAC_BT);
    snprintf(dev_name, sizeof(dev_name), "%s%02X%02X%02X", BLE_PROV_DEVICE_NAME_PREFIX,
             mac[3], mac[4], mac[5]);

    ESP_ERROR_CHECK(esp_ble_gap_set_device_name(dev_name));

    static uint8_t adv_data[sizeof(s_adv_data)];
    memcpy(adv_data, s_adv_data, sizeof(s_adv_data));
    adv_data[sizeof(s_adv_data) - 4] = mac[3];
    adv_data[sizeof(s_adv_data) - 3] = mac[4];
    adv_data[sizeof(s_adv_data) - 2] = mac[5];

    ESP_ERROR_CHECK(esp_ble_gap_config_adv_data_raw(adv_data, sizeof(adv_data)));

    static uint8_t scan_rsp[sizeof(s_scan_rsp_data)];
    memcpy(scan_rsp, s_scan_rsp_data, sizeof(s_scan_rsp_data));
    scan_rsp[sizeof(s_scan_rsp_data) - 8] = mac[3];
    scan_rsp[sizeof(s_scan_rsp_data) - 7] = mac[4];
    scan_rsp[sizeof(s_scan_rsp_data) - 6] = mac[5];
    scan_rsp[sizeof(s_scan_rsp_data) - 5] = mac[3];
    scan_rsp[sizeof(s_scan_rsp_data) - 4] = mac[4];
    scan_rsp[sizeof(s_scan_rsp_data) - 3] = mac[5];
    scan_rsp[sizeof(s_scan_rsp_data) - 2] = mac[3];
    scan_rsp[sizeof(s_scan_rsp_data) - 1] = mac[4];

    ESP_ERROR_CHECK(esp_ble_gap_config_scan_rsp_data_raw(scan_rsp, sizeof(scan_rsp)));

    ESP_ERROR_CHECK(esp_ble_gatts_app_register(0));

    s_started = true;
    ESP_LOGI(TAG, "BLE provisioning started, device name: %s", dev_name);
    return ESP_OK;
}

esp_err_t ble_provisioning_stop(void) {
    if (!s_started) {
        return ESP_OK;
    }

    ESP_LOGI(TAG, "Stopping BLE provisioning");

    esp_ble_gap_stop_advertising();
    esp_wifi_stop();

    if (s_service_handle != 0) {
        esp_ble_gatts_delete_service(s_service_handle);
        s_service_handle = 0;
    }

    esp_bluedroid_disable();
    esp_bluedroid_deinit();
    esp_bt_controller_disable();
    esp_bt_controller_deinit();

    s_started = false;
    s_status = BLE_PROV_STATUS_IDLE;
    return ESP_OK;
}

ble_prov_status_t ble_provisioning_get_status(void) {
    return s_status;
}

const char *ble_prov_status_to_string(ble_prov_status_t status) {
    switch (status) {
        case BLE_PROV_STATUS_IDLE: return "IDLE";
        case BLE_PROV_STATUS_ADVERTISING: return "ADVERTISING";
        case BLE_PROV_STATUS_CONNECTED: return "CONNECTED";
        case BLE_PROV_STATUS_PROVISIONING: return "PROVISIONING";
        case BLE_PROV_STATUS_SUCCESS: return "SUCCESS";
        case BLE_PROV_STATUS_FAILED: return "FAILED";
        default: return "UNKNOWN";
    }
}
