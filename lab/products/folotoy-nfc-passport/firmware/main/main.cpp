#include "esp_system.h"
#include "esp_log.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "nvs_flash.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_sleep.h"
#include "config.h"
#include "ble_provisioning.h"
#include "passport_controller.h"
#include "hal/audio_manager.h"
#include "hal/led_controller.h"
#include "hal/button_manager.h"

static const char *TAG = "main";

static void wifi_event_handler(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data) {
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        led_controller_set_color(0xFF0000);
        passport_controller_set_network_available(false);
        esp_wifi_connect();
    } else if (event_base == IP_EVENT && event_id == IP_EVENT_STA_GOT_IP) {
        led_controller_set_color(0x00FF00);
        passport_controller_set_network_available(true);
        ESP_LOGI(TAG, "Connected with IP address");
    }
}

static esp_err_t wifi_init(void) {
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    esp_event_handler_instance_t instance_any_id;
    esp_event_handler_instance_t instance_got_ip;
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL, &instance_any_id));
    ESP_ERROR_CHECK(esp_event_handler_instance_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &wifi_event_handler, NULL, &instance_got_ip));

    nfc_passport_config_t config;
    nfc_passport_config_get(&config);

    wifi_config_t wifi_cfg = {};
    strncpy((char *)wifi_cfg.sta.ssid, config.wifi_ssid, sizeof(wifi_cfg.sta.ssid));
    strncpy((char *)wifi_cfg.sta.password, config.wifi_password, sizeof(wifi_cfg.sta.password));

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(ESP_IF_WIFI_STA, &wifi_cfg));
    ESP_ERROR_CHECK(esp_wifi_start());

    return ESP_OK;
}

static void passport_event_handler(const passport_event_t *event) {
    ESP_LOGI(TAG, "Passport event: %s", passport_event_type_to_string(event->type));

    switch (event->type) {
        case PASSPORT_EVENT_CHECKIN_SUCCESS:
            audio_manager_play_event(AUDIO_EVENT_CHECKIN_SUCCESS);
            led_controller_blink(0x00FF00, 500);
            break;
        case PASSPORT_EVENT_CHECKIN_FAILED:
            audio_manager_play_event(AUDIO_EVENT_CHECKIN_FAILED);
            led_controller_blink(0xFF0000, 300);
            break;
        case PASSPORT_EVENT_REDEEM_SUCCESS:
            audio_manager_play_event(AUDIO_EVENT_REDEEM_SUCCESS);
            led_controller_blink(0x00FF00, 500);
            break;
        case PASSPORT_EVENT_REDEEM_FAILED:
            audio_manager_play_event(AUDIO_EVENT_REDEEM_FAILED);
            led_controller_blink(0xFF0000, 300);
            break;
        case PASSPORT_EVENT_NETWORK_ERROR:
            audio_manager_play_event(AUDIO_EVENT_NETWORK_ERROR);
            led_controller_set_color(0xFFFF00);
            break;
        default:
            break;
    }
}

static void ota_event_handler(ota_status_t status, ota_error_t error, const char *message) {
    ESP_LOGI(TAG, "OTA event: status=%d, error=%d, message=%s", status, error, message);

    switch (status) {
        case OTA_STATUS_CHECKING:
            led_controller_set_color(0x0000FF);
            break;
        case OTA_STATUS_DOWNLOADING:
        case OTA_STATUS_FLASHING:
            led_controller_blink(0x0000FF, 200);
            break;
        case OTA_STATUS_SUCCEEDED:
            audio_manager_play_event(AUDIO_EVENT_CHECKIN_SUCCESS);
            led_controller_set_color(0x00FF00);
            break;
        case OTA_STATUS_FAILED:
            audio_manager_play_event(AUDIO_EVENT_CHECKIN_FAILED);
            led_controller_set_color(0xFF0000);
            break;
        default:
            break;
    }
}

static void button_event_handler(button_event_t event, uint32_t press_duration_ms) {
    if (event == BUTTON_EVENT_LONG_PRESS && press_duration_ms > 7000) {
        ESP_LOGI(TAG, "Long press detected, triggering OTA check");
        audio_manager_play_event(AUDIO_EVENT_BUTTON_PRESS);
        passport_controller_check_ota_update("http://localhost:3000/api/firmware/latest", FIRMWARE_VERSION);
    } else if (event == BUTTON_EVENT_LONG_PRESS && press_duration_ms > 3000) {
        ESP_LOGI(TAG, "Long press detected, triggering BLE provisioning");
        audio_manager_play_event(AUDIO_EVENT_BUTTON_PRESS);
        led_controller_set_color(0x0000FF);

        nfc_passport_config_t config;
        memset(&config, 0, sizeof(config));
        strncpy(config.device_id, "device-001", DEVICE_ID_MAX_LEN);
        strncpy(config.api_base, "http://localhost:3000/api", API_BASE_MAX_LEN);
        nfc_passport_config_set(&config);
        nfc_passport_config_save();

        esp_wifi_stop();
        ble_provisioning_start();
    }
}

static void ble_prov_event_handler(ble_prov_status_t status, ble_prov_error_t error, const char *message) {
    ESP_LOGI(TAG, "BLE provisioning event: %s, error=%d, msg=%s",
             ble_prov_status_to_string(status), error, message);

    switch (status) {
        case BLE_PROV_STATUS_ADVERTISING:
            led_controller_blink(0x0000FF, 1000);
            break;
        case BLE_PROV_STATUS_CONNECTED:
            led_controller_set_color(0x00FF00);
            break;
        case BLE_PROV_STATUS_PROVISIONING:
            led_controller_set_color(0xFFFF00);
            break;
        case BLE_PROV_STATUS_SUCCESS:
            audio_manager_play_event(AUDIO_EVENT_CHECKIN_SUCCESS);
            led_controller_set_color(0x00FF00);
            vTaskDelay(pdMS_TO_TICKS(2000));
            esp_restart();
            break;
        case BLE_PROV_STATUS_FAILED:
            audio_manager_play_event(AUDIO_EVENT_CHECKIN_FAILED);
            led_controller_blink(0xFF0000, 300);
            break;
        default:
            break;
    }
}

extern "C" void app_main(void) {
    ESP_LOGI(TAG, "FOLOTOY NFC Passport Firmware v%s", FIRMWARE_VERSION);

    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    ESP_ERROR_CHECK(nfc_passport_config_init());
    ESP_ERROR_CHECK(nfc_passport_config_load());

    audio_manager_init();
    led_controller_init();
    led_controller_set_color(0x0000FF);
    button_manager_init(button_event_handler);

    passport_controller_init(passport_event_handler);
    ota_manager_set_event_cb(ota_event_handler);

    if (nfc_passport_config_is_provisioned()) {
        ESP_LOGI(TAG, "WiFi already configured, starting normal mode");
        wifi_init();
    } else {
        ESP_LOGI(TAG, "WiFi not configured, starting BLE provisioning");
        led_controller_blink(0x0000FF, 1000);
        ble_provisioning_init(ble_prov_event_handler);
        ble_provisioning_start();
    }

    ESP_LOGI(TAG, "System initialization complete");
    audio_manager_play_event(AUDIO_EVENT_STARTUP);
}
