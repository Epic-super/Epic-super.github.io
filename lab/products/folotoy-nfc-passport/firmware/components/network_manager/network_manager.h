#ifndef FOLOTOY_NFC_PASSPORT_NETWORK_MANAGER_H
#define FOLOTOY_NFC_PASSPORT_NETWORK_MANAGER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"
#include "config.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef void (*http_response_handler_t)(int status_code, const uint8_t *data, size_t len);
typedef void (*ws_event_handler_t)(int event, const uint8_t *data, size_t len);
typedef void (*mqtt_event_handler_t)(const char *topic, const uint8_t *payload, size_t len);

esp_err_t network_manager_init(const nfc_passport_config_t *config);
esp_err_t network_manager_deinit(void);
esp_err_t network_manager_http_post(const char *path, const char *json_body, http_response_handler_t handler, uint32_t timeout_ms);
esp_err_t network_manager_http_get(const char *path, http_response_handler_t handler, uint32_t timeout_ms);
esp_err_t network_manager_ws_start(ws_event_handler_t handler);
esp_err_t network_manager_ws_stop(void);
esp_err_t network_manager_ws_send(const uint8_t *data, size_t len);
esp_err_t network_manager_mqtt_start(mqtt_event_handler_t handler);
esp_err_t network_manager_mqtt_stop(void);
esp_err_t network_manager_mqtt_publish(const char *topic, const uint8_t *payload, size_t len);
bool network_manager_is_connected(void);

#ifdef __cplusplus
}
#endif

#endif
