#ifndef FOLOTOY_NFC_PASSPORT_OTA_MANAGER_H
#define FOLOTOY_NFC_PASSPORT_OTA_MANAGER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"

#ifdef __cplusplus
extern "C" {
#endif

#define OTA_VERSION_MAX_LEN    32
#define OTA_URL_MAX_LEN        256
#define OTA_CHECKSUM_MAX_LEN   64

typedef enum {
    OTA_STATUS_IDLE = 0,
    OTA_STATUS_CHECKING = 1,
    OTA_STATUS_DOWNLOADING = 2,
    OTA_STATUS_VERIFYING = 3,
    OTA_STATUS_FLASHING = 4,
    OTA_STATUS_REBOOTING = 5,
    OTA_STATUS_SUCCEEDED = 6,
    OTA_STATUS_FAILED = 7
} ota_status_t;

typedef enum {
    OTA_ERROR_NONE = 0,
    OTA_ERROR_NETWORK = 1,
    OTA_ERROR_HTTP = 2,
    OTA_ERROR_SIGNATURE = 3,
    OTA_ERROR_FLASH = 4,
    OTA_ERROR_ROLLBACK = 5
} ota_error_t;

typedef struct {
    char version[OTA_VERSION_MAX_LEN];
    char url[OTA_URL_MAX_LEN];
    char checksum[OTA_CHECKSUM_MAX_LEN];
    uint32_t size_bytes;
    bool mandatory;
    const char *notes;
} ota_image_info_t;

typedef void (*ota_event_cb_t)(ota_status_t status, ota_error_t error, const char *message);
typedef void (*ota_progress_cb_t)(uint32_t downloaded_bytes, uint32_t total_bytes);

esp_err_t ota_manager_init(void);
esp_err_t ota_manager_deinit(void);
esp_err_t ota_manager_check_update(const char *server_url, const char *current_version);
esp_err_t ota_manager_start_update(const ota_image_info_t *image);
esp_err_t ota_manager_abort(void);
ota_status_t ota_manager_get_status(void);
ota_error_t ota_manager_get_error(void);
bool ota_manager_is_running(void);
esp_err_t ota_manager_set_event_cb(ota_event_cb_t cb);
esp_err_t ota_manager_set_progress_cb(ota_progress_cb_t cb);
esp_err_t ota_manager_mark_valid(void);
esp_err_t ota_manager_mark_invalid(void);

#ifdef __cplusplus
}
#endif

#endif
