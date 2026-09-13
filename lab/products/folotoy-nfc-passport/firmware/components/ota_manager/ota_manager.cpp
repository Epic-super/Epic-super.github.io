#include "ota_manager.h"
#include "esp_log.h"
#include "esp_http_client.h"
#include "esp_https_ota.h"
#include "esp_ota_ops.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "string.h"

static const char *TAG = "ota_manager";

static bool s_initialized = false;
static bool s_running = false;
static ota_status_t s_status = OTA_STATUS_IDLE;
static ota_error_t s_error = OTA_ERROR_NONE;
static char s_message[128] = {0};
static ota_event_cb_t s_event_cb = NULL;
static ota_progress_cb_t s_progress_cb = NULL;

static void set_status(ota_status_t status, ota_error_t error, const char *message) {
    s_status = status;
    s_error = error;
    if (message) {
        strncpy(s_message, message, sizeof(s_message) - 1);
    } else {
        s_message[0] = 0;
    }

    if (s_event_cb) {
        s_event_cb(status, error, s_message);
    }
}

static esp_err_t http_event_handler(esp_http_client_event_t *evt) {
    switch (evt->event_id) {
        case HTTP_EVENT_ON_DATA:
            if (s_progress_cb && evt->user_data) {
                uint32_t *total = (uint32_t *)evt->user_data;
                *total += evt->data_len;
                s_progress_cb(*total, *total);
            }
            break;
        default:
            break;
    }
    return ESP_OK;
}

esp_err_t ota_manager_init(void) {
    if (s_initialized) {
        return ESP_OK;
    }

    const esp_partition_t *running = esp_ota_get_running_partition();
    if (!running) {
        ESP_LOGE(TAG, "Failed to get running partition");
        return ESP_FAIL;
    }

    s_initialized = true;
    s_running = false;
    s_status = OTA_STATUS_IDLE;
    s_error = OTA_ERROR_NONE;
    s_message[0] = 0;

    ESP_LOGI(TAG, "OTA manager initialized, running partition: %s", running->label);
    return ESP_OK;
}

esp_err_t ota_manager_deinit(void) {
    ota_manager_abort();
    s_initialized = false;
    return ESP_OK;
}

esp_err_t ota_manager_check_update(const char *server_url, const char *current_version) {
    if (!s_initialized || !server_url || !current_version) {
        return ESP_ERR_INVALID_ARG;
    }

    if (s_running) {
        return ESP_ERR_INVALID_STATE;
    }

    set_status(OTA_STATUS_CHECKING, OTA_ERROR_NONE, "Checking update");
    ESP_LOGI(TAG, "Checking update from %s, current version: %s", server_url, current_version);

    esp_http_client_config_t cfg = {
        .url = server_url,
        .timeout_ms = 10000,
    };

    esp_http_client_handle_t client = esp_http_client_init(&cfg);
    if (!client) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_HTTP, "HTTP client init failed");
        return ESP_FAIL;
    }

    esp_err_t err = esp_http_client_open(client, 0);
    if (err != ESP_OK) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_HTTP, "HTTP open failed");
        esp_http_client_cleanup(client);
        return err;
    }

    int content_length = esp_http_client_fetch_headers(client);
    if (content_length <= 0) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_HTTP, "Invalid content length");
        esp_http_client_cleanup(client);
        return ESP_FAIL;
    }

    char *buffer = malloc(content_length + 1);
    if (!buffer) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_HTTP, "Memory allocation failed");
        esp_http_client_cleanup(client);
        return ESP_ERR_NO_MEM;
    }

    int read_len = esp_http_client_read(client, buffer, content_length);
    buffer[read_len] = 0;

    ota_image_info_t image;
    memset(&image, 0, sizeof(image));
    image.size_bytes = content_length;
    strncpy(image.url, server_url, sizeof(image.url) - 1);

    if (strstr(buffer, current_version)) {
        ESP_LOGI(TAG, "Already on latest version");
        set_status(OTA_STATUS_IDLE, OTA_ERROR_NONE, "Already on latest version");
    } else {
        ESP_LOGI(TAG, "Update available");
        set_status(OTA_STATUS_IDLE, OTA_ERROR_NONE, "Update available");
    }

    free(buffer);
    esp_http_client_cleanup(client);
    return ESP_OK;
}

esp_err_t ota_manager_start_update(const ota_image_info_t *image) {
    if (!s_initialized || !image) {
        return ESP_ERR_INVALID_ARG;
    }

    if (s_running) {
        return ESP_ERR_INVALID_STATE;
    }

    s_running = true;
    set_status(OTA_STATUS_DOWNLOADING, OTA_ERROR_NONE, "Downloading update");

    esp_http_client_config_t cfg = {
        .url = image->url,
        .timeout_ms = 30000,
        .event_handler = http_event_handler,
    };

    esp_https_ota_config_t ota_cfg = {
        .http_config = &cfg,
    };

    esp_ota_handle_t ota_handle = 0;
    const esp_partition_t *update_partition = esp_ota_get_next_update_partition(NULL);
    if (!update_partition) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_FLASH, "No update partition");
        s_running = false;
        return ESP_FAIL;
    }

    esp_err_t err = esp_https_ota_begin(&ota_cfg, &ota_handle);
    if (err != ESP_OK) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_HTTP, "OTA begin failed");
        s_running = false;
        return err;
    }

    set_status(OTA_STATUS_FLASHING, OTA_ERROR_NONE, "Flashing firmware");

    while (1) {
        if (!s_running) {
            esp_https_ota_abort(ota_handle);
            set_status(OTA_STATUS_IDLE, OTA_ERROR_NONE, "OTA aborted");
            return ESP_ERR_INVALID_STATE;
        }

        int data_len = esp_https_ota_read(ota_handle, NULL, 1024);
        if (data_len < 0) {
            set_status(OTA_STATUS_FAILED, OTA_ERROR_HTTP, "OTA read failed");
            esp_https_ota_abort(ota_handle);
            s_running = false;
            return ESP_FAIL;
        }

        if (data_len == 0) {
            break;
        }
    }

    err = esp_https_ota_finish(ota_handle);
    if (err != ESP_OK) {
        set_status(OTA_STATUS_FAILED, OTA_ERROR_FLASH, "OTA finish failed");
        s_running = false;
        return err;
    }

    set_status(OTA_STATUS_REBOOTING, OTA_ERROR_NONE, "Rebooting");
    ESP_LOGI(TAG, "OTA completed successfully, rebooting...");

    esp_restart();
    return ESP_OK;
}

esp_err_t ota_manager_abort(void) {
    if (!s_running) {
        return ESP_OK;
    }

    s_running = false;
    set_status(OTA_STATUS_IDLE, OTA_ERROR_NONE, "OTA aborted");
    return ESP_OK;
}

ota_status_t ota_manager_get_status(void) {
    return s_status;
}

ota_error_t ota_manager_get_error(void) {
    return s_error;
}

bool ota_manager_is_running(void) {
    return s_running;
}

esp_err_t ota_manager_set_event_cb(ota_event_cb_t cb) {
    s_event_cb = cb;
    return ESP_OK;
}

esp_err_t ota_manager_set_progress_cb(ota_progress_cb_t cb) {
    s_progress_cb = cb;
    return ESP_OK;
}

esp_err_t ota_manager_mark_valid(void) {
    esp_ota_img_boot_state_t state = esp_ota_get_boot_partition();
    if (state != ESP_OTA_IMG_VALID) {
        esp_err_t err = esp_ota_mark_app_valid_cancel_rollback();
        if (err != ESP_OK) {
            ESP_LOGE(TAG, "Failed to mark app valid");
            return err;
        }
    }
    ESP_LOGI(TAG, "App marked as valid");
    return ESP_OK;
}

esp_err_t ota_manager_mark_invalid(void) {
    esp_err_t err = esp_ota_mark_app_invalid_rollback_and_reboot();
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Failed to mark app invalid");
        return err;
    }
    return ESP_OK;
}
