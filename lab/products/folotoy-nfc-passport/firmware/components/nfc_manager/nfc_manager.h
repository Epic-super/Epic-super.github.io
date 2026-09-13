#ifndef FOLOTOY_NFC_PASSPORT_NFC_MANAGER_H
#define FOLOTOY_NFC_PASSPORT_NFC_MANAGER_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

#define NFC_UID_MAX_LEN 10
#define NFC_TAG_TYPE_MAX_LEN 32

typedef struct {
    uint8_t uid[NFC_UID_MAX_LEN];
    size_t uid_len;
    char type[NFC_TAG_TYPE_MAX_LEN];
    uint32_t sak;
} nfc_tag_info_t;

typedef enum {
    NFC_STATUS_OK = 0,
    NFC_STATUS_ERROR = -1,
    NFC_STATUS_TIMEOUT = -2,
    NFC_STATUS_NOT_SUPPORTED = -3
} nfc_status_t;

typedef void (*nfc_callback_t)(const nfc_tag_info_t *tag);

esp_err_t nfc_manager_init(void);
esp_err_t nfc_manager_deinit(void);
nfc_status_t nfc_manager_wait_for_tag(nfc_tag_info_t *tag, TickType_t timeout_ticks);
esp_err_t nfc_manager_register_callback(nfc_callback_t callback);
esp_err_t nfc_manager_start_polling(void);
esp_err_t nfc_manager_stop_polling(void);
const char *nfc_status_to_string(nfc_status_t status);

#ifdef __cplusplus
}
#endif

#endif
