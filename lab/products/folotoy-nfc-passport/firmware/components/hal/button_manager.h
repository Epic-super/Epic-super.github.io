#ifndef FOLOTOY_NFC_PASSPORT_BUTTON_MANAGER_H
#define FOLOTOY_NFC_PASSPORT_BUTTON_MANAGER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
    BUTTON_EVENT_PRESS = 0,
    BUTTON_EVENT_RELEASE = 1,
    BUTTON_EVENT_LONG_PRESS = 2,
    BUTTON_EVENT_DOUBLE_PRESS = 3
} button_event_t;

typedef void (*button_event_callback_t)(button_event_t event, uint32_t press_duration_ms);

esp_err_t button_manager_init(button_event_callback_t callback);
esp_err_t button_manager_deinit(void);
bool button_manager_is_pressed(void);
uint32_t button_manager_get_last_press_duration(void);

#ifdef __cplusplus
}
#endif

#endif
