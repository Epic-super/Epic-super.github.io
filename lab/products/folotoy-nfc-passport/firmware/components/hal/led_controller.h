#ifndef FOLOTOY_NFC_PASSPORT_LED_CONTROLLER_H
#define FOLOTOY_NFC_PASSPORT_LED_CONTROLLER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"

#ifdef __cplusplus
extern "C" {
#endif

#define LED_COLOR_RED    0xFF0000
#define LED_COLOR_GREEN  0x00FF00
#define LED_COLOR_BLUE   0x0000FF
#define LED_COLOR_YELLOW 0xFFFF00
#define LED_COLOR_WHITE  0xFFFFFF
#define LED_COLOR_OFF    0x000000

typedef enum {
    LED_MODE_SOLID = 0,
    LED_MODE_BLINK = 1,
    LED_MODE_BREATH = 2,
    LED_MODE_RAINBOW = 3
} led_mode_t;

typedef struct {
    uint32_t color;
    led_mode_t mode;
    uint16_t on_ms;
    uint16_t off_ms;
    uint8_t brightness;
} led_pattern_t;

esp_err_t led_controller_init(void);
esp_err_t led_controller_deinit(void);
esp_err_t led_controller_set_pattern(const led_pattern_t *pattern);
esp_err_t led_controller_set_color(uint32_t color);
esp_err_t led_controller_blink(uint32_t color, uint16_t period_ms);
esp_err_t led_controller_breath(uint32_t color, uint16_t period_ms);
esp_err_t led_controller_off(void);

#ifdef __cplusplus
}
#endif

#endif
