#ifndef FOLOTOY_NFC_PASSPORT_PASSPORT_CONTROLLER_H
#define FOLOTOY_NFC_PASSPORT_PASSPORT_CONTROLLER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"
#include "nfc_manager.h"
#include "ota_manager.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
    PASSPORT_EVENT_CHECKIN_SUCCESS = 0,
    PASSPORT_EVENT_CHECKIN_FAILED = 1,
    PASSPORT_EVENT_REDEEM_SUCCESS = 2,
    PASSPORT_EVENT_REDEEM_FAILED = 3,
    PASSPORT_EVENT_NETWORK_ERROR = 4,
    PASSPORT_EVENT_INVALID_TAG = 5
} passport_event_type_t;

typedef struct {
    passport_event_type_t type;
    int32_t tokens_earned;
    int32_t total_tokens;
    char message[128];
    char location[64];
} passport_event_t;

typedef void (*passport_event_handler_t)(const passport_event_t *event);

esp_err_t passport_controller_init(passport_event_handler_t handler);
esp_err_t passport_controller_deinit(void);
esp_err_t passport_controller_on_nfc_detected(const nfc_tag_info_t *tag);
esp_err_t passport_controller_request_balance(void);
esp_err_t passport_controller_request_rewards(void);
esp_err_t passport_controller_redeem_reward(uint32_t reward_id);
esp_err_t passport_controller_sync_state(void);
esp_err_t passport_controller_set_network_available(bool available);
esp_err_t passport_controller_check_ota_update(const char *server_url, const char *current_version);
esp_err_t passport_controller_start_ota(const ota_image_info_t *image);
const char *passport_event_type_to_string(passport_event_type_t type);

#ifdef __cplusplus
}
#endif

#endif
