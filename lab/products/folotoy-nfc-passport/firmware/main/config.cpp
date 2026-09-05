#include "config.h"
#include "nvs.h"
#include "nvs_flash.h"
#include "esp_log.h"
#include "string.h"

static const char *TAG = "nfc_config";

static nfc_passport_config_t s_config = {};

static esp_err_t set_defaults(nfc_passport_config_t *config) {
    memset(config, 0, sizeof(*config));
    strncpy(config->wifi_ssid, "YOUR_WIFI_SSID", WIFI_SSID_MAX_LEN);
    strncpy(config->wifi_password, "YOUR_WIFI_PASSWORD", WIFI_PASS_MAX_LEN);
    strncpy(config->device_id, "device-001", DEVICE_ID_MAX_LEN);
    strncpy(config->api_base, "http://localhost:3000/api", API_BASE_MAX_LEN);
    strncpy(config->mqtt_uri, "mqtt://localhost:1883", MQTT_URI_MAX_LEN);
    strncpy(config->mqtt_topic_prefix, "folotoy/nfc", 64);
    config->mqtt_port = 1883;
    config->ws_port = 8080;
    config->use_mqtt = true;
    config->use_ws = false;
    return ESP_OK;
}

esp_err_t nfc_passport_config_init(void) {
    set_defaults(&s_config);
    return ESP_OK;
}

esp_err_t nfc_passport_config_set(const nfc_passport_config_t *config) {
    if (!config) {
        return ESP_ERR_INVALID_ARG;
    }
    memcpy(&s_config, config, sizeof(nfc_passport_config_t));
    return ESP_OK;
}

esp_err_t nfc_passport_config_get(nfc_passport_config_t *config) {
    if (!config) {
        return ESP_ERR_INVALID_ARG;
    }
    memcpy(config, &s_config, sizeof(nfc_passport_config_t));
    return ESP_OK;
}

esp_err_t nfc_passport_config_save(void) {
    nvs_handle_t handle = 0;
    esp_err_t err = nvs_open("nfc_config", NVS_READWRITE, &handle);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Failed to open NVS");
        return err;
    }

    err = nvs_set_blob(handle, "config", &s_config, sizeof(s_config));
    if (err == ESP_OK) {
        err = nvs_commit(handle);
    }

    nvs_close(handle);
    return err;
}

esp_err_t nfc_passport_config_load(void) {
    nvs_handle_t handle = 0;
    esp_err_t err = nvs_open("nfc_config", NVS_READONLY, &handle);
    if (err != ESP_OK) {
        return err;
    }

    size_t len = sizeof(s_config);
    err = nvs_get_blob(handle, "config", &s_config, &len);
    nvs_close(handle);

    if (err == ESP_ERR_NVS_NOT_FOUND || len != sizeof(s_config)) {
        return ESP_ERR_NOT_FOUND;
    }

    return ESP_OK;
}

bool nfc_passport_config_is_provisioned(void) {
    return strlen(s_config.wifi_ssid) > 0 &&
           strcmp(s_config.wifi_ssid, "YOUR_WIFI_SSID") != 0;
}
