#include "at_command_handler.h"
#include "esp_log.h"
#include "esp_rom_uart.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "string.h"

static const char *TAG = "at_handler";

static bool s_initialized = false;

static int read_line(uint8_t *buf, size_t max_len, uint32_t timeout_ms) {
    size_t idx = 0;
    uint32_t start = xTaskGetTickCount();

    while (idx < max_len - 1) {
        if ((xTaskGetTickCount() - start) > pdMS_TO_TICKS(timeout_ms)) {
            break;
        }

        uint8_t ch;
        int ret = uart_read_bytes(AT_UART_PORT, &ch, 1, pdMS_TO_TICKS(10));
        if (ret == 1) {
            if (ch == '\n') {
                break;
            }
            buf[idx++] = ch;
        }
    }

    buf[idx] = 0;
    return idx;
}

static at_status_t wait_for_ack(uint32_t timeout_ms) {
    uint8_t buf[AT_RESP_MAX_LEN] = {0};
    uint32_t start = xTaskGetTickCount();

    while ((xTaskGetTickCount() - start) < pdMS_TO_TICKS(timeout_ms)) {
        int len = read_line(buf, sizeof(buf), timeout_ms);
        if (len == 0) {
            continue;
        }

        if (strstr((const char *)buf, "OK")) {
            return AT_OK;
        }
        if (strstr((const char *)buf, "ERROR")) {
            return AT_ERROR;
        }
    }

    return AT_TIMEOUT;
}

esp_err_t at_command_handler_init(void) {
    if (s_initialized) {
        return ESP_OK;
    }

    uart_config_t uart_cfg = {
        .baud_rate = AT_UART_BAUD,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_DISABLE,
        .source_clk = UART_SCLK_APB,
    };

    esp_err_t ret = uart_driver_install(AT_UART_PORT, 1024, 1024, 0, NULL, 0);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "UART driver install failed");
        return ret;
    }

    ret = uart_param_config(AT_UART_PORT, &uart_cfg);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "UART param config failed");
        return ret;
    }

    ret = uart_set_pin(AT_UART_PORT, AT_UART_TX_PIN, AT_UART_RX_PIN, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "UART set pin failed");
        return ret;
    }

    s_initialized = true;
    ESP_LOGI(TAG, "AT command handler initialized");
    return ESP_OK;
}

esp_err_t at_command_handler_deinit(void) {
    if (s_initialized) {
        uart_driver_delete(AT_UART_PORT);
        s_initialized = false;
    }
    return ESP_OK;
}

at_status_t at_command_send(const char *cmd, at_response_t *resp, uint32_t timeout_ms) {
    if (!cmd || !resp || !s_initialized) {
        return AT_INVALID;
    }

    memset(resp, 0, sizeof(at_response_t));

    const char *cmd_with_cr = cmd;
    bool need_cr = (cmd[strlen(cmd) - 1] != '\r');
    size_t cmd_len = strlen(cmd) + (need_cr ? 1 : 0);

    uart_write_bytes(AT_UART_PORT, cmd, strlen(cmd));
    if (need_cr) {
        uart_write_bytes(AT_UART_PORT, "\r", 1);
    }

    uint32_t start = xTaskGetTickCount();
    while ((xTaskGetTickCount() - start) < pdMS_TO_TICKS(timeout_ms)) {
        int len = read_line(resp->data, AT_RESP_MAX_LEN, 50);
        if (len > 0) {
            resp->len = len;
            at_status_t status = wait_for_ack(100);
            return status;
        }
    }

    return AT_TIMEOUT;
}

at_status_t at_command_send_with_data(const char *cmd, const uint8_t *data, size_t len, at_response_t *resp, uint32_t timeout_ms) {
    if (!cmd || !data || !resp || !s_initialized) {
        return AT_INVALID;
    }

    memset(resp, 0, sizeof(at_response_t));

    uart_write_bytes(AT_UART_PORT, cmd, strlen(cmd));
    uart_write_bytes(AT_UART_PORT, (const char *)data, len);
    uart_write_bytes(AT_UART_PORT, "\r", 1);

    uint32_t start = xTaskGetTickCount();
    while ((xTaskGetTickCount() - start) < pdMS_TO_TICKS(timeout_ms)) {
        int line_len = read_line(resp->data, AT_RESP_MAX_LEN, 50);
        if (line_len > 0) {
            resp->len = line_len;
            at_status_t status = wait_for_ack(100);
            return status;
        }
    }

    return AT_TIMEOUT;
}

at_status_t at_command_query(const char *cmd, char *value_buf, size_t buf_len, uint32_t timeout_ms) {
    at_response_t resp;
    at_status_t status = at_command_send(cmd, &resp, timeout_ms);
    if (status != AT_OK) {
        return status;
    }

    const char *eq = strstr((const char *)resp.data, ":");
    if (!eq) {
        return AT_INVALID;
    }

    eq += 1;
    while (*eq == ' ') {
        eq++;
    }

    strncpy(value_buf, eq, buf_len - 1);
    value_buf[buf_len - 1] = 0;

    return AT_OK;
}

at_status_t at_command_exec(const char *cmd, uint32_t timeout_ms) {
    at_response_t resp;
    at_status_t status = at_command_send(cmd, &resp, timeout_ms);
    if (status == AT_OK || status == AT_TIMEOUT) {
        return AT_OK;
    }
    return status;
}

const char *at_status_to_string(at_status_t status) {
    switch (status) {
        case AT_OK: return "OK";
        case AT_ERROR: return "ERROR";
        case AT_TIMEOUT: return "TIMEOUT";
        case AT_INVALID: return "INVALID";
        default: return "UNKNOWN";
    }
}
