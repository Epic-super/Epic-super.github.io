#include "network_manager.h"
#include "esp_log.h"
#include "esp_http_client.h"
#include "esp_websocket_client.h"
#include "esp_mqtt_client.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "cJSON.h"

static const char *TAG = "network_manager";

static nfc_passport_config_t s_config;
static bool s_initialized = false;
static bool s_wifi_connected = false;
static ws_event_handler_t s_ws_handler = NULL;
static mqtt_event_handler_t s_mqtt_handler = NULL;

static char s_http_path[256] = {0};
static http_response_handler_t s_http_handler = NULL;
static SemaphoreHandle_t s_http_done = NULL;
static int s_http_status = 0;
static uint8_t s_http_body[1024] = {0};
static size_t s_http_len = 0;

static esp_err_t http_event_handler(esp_http_client_event_t *evt) {
    switch (evt->event_id) {
        case HTTP_EVENT_ON_CONNECTED:
            ESP_LOGD(TAG, "HTTP connected");
            break;
        case HTTP_EVENT_HEADERS_SENT:
            break;
        case HTTP_EVENT_ON_HEADER:
            break;
        case HTTP_EVENT_ON_DATA:
            if (!s_http_handler) {
                if (s_http_len + evt->data_len < sizeof(s_http_body)) {
                    memcpy(s_http_body + s_http_len, evt->data, evt->data_len);
                    s_http_len += evt->data_len;
                }
            }
            break;
        case HTTP_EVENT_STATUS_CHANGED:
            s_http_status = esp_http_client_get_status_code(evt->client);
            break;
        case HTTP_EVENT_ON_FINISH:
            if (s_http_handler && s_http_done) {
                s_http_handler(s_http_status, s_http_body, s_http_len);
            }
            if (s_http_done) {
                xSemaphoreGive(s_http_done);
            }
            break;
        default:
            break;
    }
    return ESP_OK;
}

static void http_perform(const char *method, const char *path, const char *body, http_response_handler_t handler, uint32_t timeout_ms) {
    if (!s_wifi_connected) {
        if (handler) {
            handler(0, (const uint8_t *)"WIFI_NOT_CONNECTED", 19);
        }
        return;
    }

    s_http_handler = handler;
    s_http_status = 0;
    s_http_len = 0;
    memset(s_http_body, 0, sizeof(s_http_body));

    if (!s_http_done) {
        s_http_done = xSemaphoreCreateBinary();
    }

    char full_url[256] = {0};
    snprintf(full_url, sizeof(full_url), "%s%s", s_config.api_base, path);

    esp_http_client_config_t cfg = {
        .url = full_url,
        .method = method,
        .timeout_ms = timeout_ms,
        .event_handler = http_event_handler,
    };

    esp_http_client_handle_t client = esp_http_client_init(&cfg);
    if (!client) {
        if (handler) {
            handler(0, (const uint8_t *)"HTTP_CLIENT_INIT_FAILED", 24);
        }
        return;
    }

    if (body) {
        esp_http_client_set_header(client, "Content-Type", "application/json");
        esp_http_client_set_post_field(client, body, strlen(body));
    }

    esp_http_client_perform(client);
    esp_http_client_cleanup(client);

    if (handler && !s_http_done) {
        handler(s_http_status, s_http_body, s_http_len);
    }
}

esp_err_t network_manager_init(const nfc_passport_config_t *config) {
    if (s_initialized) {
        return ESP_OK;
    }

    memcpy(&s_config, config, sizeof(nfc_passport_config_t));
    s_initialized = true;
    s_wifi_connected = false;
    ESP_LOGI(TAG, "Network manager initialized, API: %s", s_config.api_base);
    return ESP_OK;
}

esp_err_t network_manager_deinit(void) {
    network_manager_ws_stop();
    network_manager_mqtt_stop();
    s_initialized = false;
    s_wifi_connected = false;
    return ESP_OK;
}

esp_err_t network_manager_http_post(const char *path, const char *json_body, http_response_handler_t handler, uint32_t timeout_ms) {
    http_perform("POST", path, json_body, handler, timeout_ms);
    return ESP_OK;
}

esp_err_t network_manager_http_get(const char *path, http_response_handler_t handler, uint32_t timeout_ms) {
    http_perform("GET", path, NULL, handler, timeout_ms);
    return ESP_OK;
}

esp_err_t network_manager_ws_start(ws_event_handler_t handler) {
    s_ws_handler = handler;
    ESP_LOGI(TAG, "WebSocket handler registered");
    return ESP_OK;
}

esp_err_t network_manager_ws_stop(void) {
    s_ws_handler = NULL;
    return ESP_OK;
}

esp_err_t network_manager_ws_send(const uint8_t *data, size_t len) {
    ESP_LOGI(TAG, "WebSocket send placeholder, len=%d", (int)len);
    return ESP_OK;
}

esp_err_t network_manager_mqtt_start(mqtt_event_handler_t handler) {
    s_mqtt_handler = handler;
    ESP_LOGI(TAG, "MQTT handler registered");
    return ESP_OK;
}

esp_err_t network_manager_mqtt_stop(void) {
    s_mqtt_handler = NULL;
    return ESP_OK;
}

esp_err_t network_manager_mqtt_publish(const char *topic, const uint8_t *payload, size_t len) {
    if (!s_wifi_connected) {
        return ESP_ERR_INVALID_STATE;
    }
    ESP_LOGI(TAG, "MQTT publish placeholder topic=%s len=%d", topic, (int)len);
    return ESP_OK;
}

bool network_manager_is_connected(void) {
    return s_wifi_connected;
}
