#ifndef FOLOTOY_NFC_PASSPORT_CONFIG_H
#define FOLOTOY_NFC_PASSPORT_CONFIG_H

#include <stdint.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

#define FIRMWARE_VERSION "1.0.0"

#define WIFI_SSID_MAX_LEN     32
#define WIFI_PASS_MAX_LEN     64
#define DEVICE_ID_MAX_LEN     64
#define TAG_UID_MAX_LEN       24
#define MQTT_URI_MAX_LEN      128
#define API_BASE_MAX_LEN      128

typedef struct {
    char wifi_ssid[WIFI_SSID_MAX_LEN];
    char wifi_password[WIFI_PASS_MAX_LEN];
    char device_id[DEVICE_ID_MAX_LEN];
    char api_base[API_BASE_MAX_LEN];
    char mqtt_uri[MQTT_URI_MAX_LEN];
    char mqtt_topic_prefix[64];
    uint16_t mqtt_port;
    uint16_t ws_port;
    bool use_mqtt;
    bool use_ws;
} nfc_passport_config_t;

esp_err_t nfc_passport_config_init(void);
esp_err_t nfc_passport_config_set(const nfc_passport_config_t *config);
esp_err_t nfc_passport_config_get(nfc_passport_config_t *config);
esp_err_t nfc_passport_config_save(void);
esp_err_t nfc_passport_config_load(void);
bool nfc_passport_config_is_provisioned(void);

#ifdef __cplusplus
}
#endif

#endif
