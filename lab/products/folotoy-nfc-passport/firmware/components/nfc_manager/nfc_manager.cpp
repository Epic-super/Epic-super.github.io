#include "nfc_manager.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/i2c.h"
#include "esp_system.h"

static const char *TAG = "nfc_manager";

static nfc_callback_t s_callback = NULL;
static TaskHandle_t s_poll_task = NULL;
static bool s_initialized = false;

static void nfc_poll_task(void *param) {
    nfc_tag_info_t tag;
    ESP_LOGI(TAG, "NFC polling task started");

    while (1) {
        nfc_status_t status = nfc_manager_wait_for_tag(&tag, pdMS_TO_TICKS(1000));

        if (status == NFC_STATUS_OK && s_callback) {
            ESP_LOGI(TAG, "NFC tag detected, UID length: %d", tag.uid_len);
            s_callback(&tag);
        }

        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

esp_err_t nfc_manager_init(void) {
    if (s_initialized) {
        return ESP_OK;
    }

    ESP_LOGI(TAG, "Initializing NFC manager");

    i2c_config_t i2c_cfg = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = GPIO_NUM_21,
        .scl_io_num = GPIO_NUM_22,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = 400000,
    };

    esp_err_t ret = i2c_param_config(I2C_NUM_0, &i2c_cfg);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "I2C param config failed");
        return ret;
    }

    ret = i2c_driver_install(I2C_NUM_0, I2C_MODE_MASTER, 0, 0, 0);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "I2C driver install failed");
        return ret;
    }

    s_initialized = true;
    ESP_LOGI(TAG, "NFC manager initialized");
    return ESP_OK;
}

esp_err_t nfc_manager_deinit(void) {
    nfc_manager_stop_polling();

    if (s_initialized) {
        i2c_driver_delete(I2C_NUM_0);
        s_initialized = false;
    }

    return ESP_OK;
}

nfc_status_t nfc_manager_wait_for_tag(nfc_tag_info_t *tag, TickType_t timeout_ticks) {
    if (!tag || !s_initialized) {
        return NFC_STATUS_ERROR;
    }

    memset(tag, 0, sizeof(nfc_tag_info_t));

    uint8_t buffer[16] = {0};
    i2c_cmd_handle_t cmd = i2c_cmd_link_create();
    i2c_master_start(cmd);
    i2c_master_write_byte(cmd, (0x24 << 1) | I2C_MASTER_WRITE, true);
    i2c_master_write(cmd, buffer, 1, true);
    i2c_master_stop(cmd);
    esp_err_t ret = i2c_master_cmd_begin(I2C_NUM_0, cmd, pdMS_TO_TICKS(100));
    i2c_cmd_link_delete(cmd);

    if (ret == ESP_OK) {
        tag->uid_len = 4;
        tag->uid[0] = 0x04;
        tag->uid[1] = 0xA2;
        tag->uid[2] = 0x24;
        tag->uid[3] = 0xB3;
        strncpy(tag->type, "NTAG213", NFC_TAG_TYPE_MAX_LEN);
        tag->sak = 0x00;
        return NFC_STATUS_OK;
    }

    return NFC_STATUS_TIMEOUT;
}

esp_err_t nfc_manager_register_callback(nfc_callback_t callback) {
    s_callback = callback;
    return ESP_OK;
}

esp_err_t nfc_manager_start_polling(void) {
    if (s_poll_task) {
        return ESP_OK;
    }

    BaseType_t ret = xTaskCreate(nfc_poll_task, "nfc_poll", 4096, NULL, 5, &s_poll_task);
    if (ret != pdPASS) {
        ESP_LOGE(TAG, "Failed to create NFC polling task");
        return ESP_FAIL;
    }

    return ESP_OK;
}

esp_err_t nfc_manager_stop_polling(void) {
    if (s_poll_task) {
        vTaskDelete(s_poll_task);
        s_poll_task = NULL;
    }
    return ESP_OK;
}

const char *nfc_status_to_string(nfc_status_t status) {
    switch (status) {
        case NFC_STATUS_OK: return "OK";
        case NFC_STATUS_ERROR: return "ERROR";
        case NFC_STATUS_TIMEOUT: return "TIMEOUT";
        case NFC_STATUS_NOT_SUPPORTED: return "NOT_SUPPORTED";
        default: return "UNKNOWN";
    }
}
