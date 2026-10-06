#ifndef FOLOTOY_NFC_PASSPORT_AUDIO_MANAGER_H
#define FOLOTOY_NFC_PASSPORT_AUDIO_MANAGER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
    AUDIO_EVENT_CHECKIN_SUCCESS = 0,
    AUDIO_EVENT_CHECKIN_FAILED = 1,
    AUDIO_EVENT_REDEEM_SUCCESS = 2,
    AUDIO_EVENT_REDEEM_FAILED = 3,
    AUDIO_EVENT_NETWORK_ERROR = 4,
    AUDIO_EVENT_BUTTON_PRESS = 5,
    AUDIO_EVENT_STARTUP = 6,
    AUDIO_EVENT_SHUTDOWN = 7
} audio_event_t;

esp_err_t audio_manager_init(void);
esp_err_t audio_manager_deinit(void);
esp_err_t audio_manager_play_event(audio_event_t event);
esp_err_t audio_manager_play_file(const char *file_path);
esp_err_t audio_manager_set_volume(uint8_t volume);
esp_err_t audio_manager_stop(void);
bool audio_manager_is_playing(void);

#ifdef __cplusplus
}
#endif

#endif
