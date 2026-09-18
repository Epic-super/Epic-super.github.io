#ifndef FOLOTOY_NFC_PASSPORT_BLE_PROVISIONING_H
#define FOLOTOY_NFC_PASSPORT_BLE_PROVISIONING_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"

#ifdef __cplusplus
extern "C" {
#endif

#define BLE_PROV_DEVICE_NAME_PREFIX "FOLOTOY_"
#define BLE_PROV_ADV_TIMEOUT_MS   300000

typedef enum {
    BLE_PROV_STATUS_IDLE = 0,
    BLE_PROV_STATUS_ADVERTISING = 1,
    BLE_PROV_STATUS_CONNECTED = 2,
    BLE_PROV_STATUS_PROVISIONING = 3,
    BLE_PROV_STATUS_SUCCESS = 4,
    BLE_PROV_STATUS_FAILED = 5
} ble_prov_status_t;

typedef enum {
    BLE_PROV_ERROR_NONE = 0,
    BLE_PROV_ERROR_BLE = 1,
    BLE_PROV_ERROR_WIFI = 2,
    BLE_PROV_ERROR_TIMEOUT = 3
} ble_prov_error_t;

typedef void (*ble_prov_event_cb_t)(ble_prov_status_t status, ble_prov_error_t error, const char *message);

esp_err_t ble_provisioning_init(ble_prov_event_cb_t cb);
esp_err_t ble_provisioning_deinit(void);
esp_err_t ble_provisioning_start(void);
esp_err_t ble_provisioning_stop(void);
ble_prov_status_t ble_provisioning_get_status(void);
const char *ble_prov_status_to_string(ble_prov_status_t status);

#ifdef __cplusplus
}
#endif

#endif
