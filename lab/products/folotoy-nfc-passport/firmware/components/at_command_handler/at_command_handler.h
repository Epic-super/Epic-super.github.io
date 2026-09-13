#ifndef FOLOTOY_NFC_PASSPORT_AT_COMMAND_HANDLER_H
#define FOLOTOY_NFC_PASSPORT_AT_COMMAND_HANDLER_H

#include <stdint.h>
#include <stdbool.h>
#include "esp_system.h"
#include "driver/uart.h"

#ifdef __cplusplus
extern "C" {
#endif

#define AT_CMD_MAX_LEN    128
#define AT_RESP_MAX_LEN   256
#define AT_UART_PORT      UART_NUM_1
#define AT_UART_BAUD      115200
#define AT_UART_RX_PIN    16
#define AT_UART_TX_PIN    17

typedef enum {
    AT_OK = 0,
    AT_ERROR = 1,
    AT_TIMEOUT = 2,
    AT_INVALID = 3
} at_status_t;

typedef struct {
    uint8_t data[AT_RESP_MAX_LEN];
    size_t len;
} at_response_t;

esp_err_t at_command_handler_init(void);
esp_err_t at_command_handler_deinit(void);
at_status_t at_command_send(const char *cmd, at_response_t *resp, uint32_t timeout_ms);
at_status_t at_command_send_with_data(const char *cmd, const uint8_t *data, size_t len, at_response_t *resp, uint32_t timeout_ms);
at_status_t at_command_query(const char *cmd, char *value_buf, size_t buf_len, uint32_t timeout_ms);
at_status_t at_command_exec(const char *cmd, uint32_t timeout_ms);
const char *at_status_to_string(at_status_t status);

#ifdef __cplusplus
}
#endif

#endif
