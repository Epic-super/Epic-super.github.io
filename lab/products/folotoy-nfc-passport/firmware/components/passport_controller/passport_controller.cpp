#include "passport_controller.h"
#include "esp_log.h"
#include "cJSON.h"
#include "string.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include <stdio.h>
#include "offline_cache.h"
#include "ota_manager.h"

static const char *TAG = "passport_ctrl";

static passport_event_handler_t s_handler = NULL;
static char s_device_id[64] = "device-unknown";
static bool s_network_available = false;

static void emit_event(const passport_event_t *event) {
    if (s_handler) {
        s_handler(event);
    }
}

static void build_json_checkin(const char *tag_uid, char *out_buf, size_t out_len) {
    cJSON *root = cJSON_CreateObject();
    cJSON_AddStringToObject(root, "type", "nfc_checkin");
    cJSON_AddStringToObject(root, "device_id", s_device_id);
    cJSON_AddStringToObject(root, "tag_uid", tag_uid);
    char *json = cJSON_PrintUnformatted(root);
    strncpy(out_buf, json ? json : "{}", out_len - 1);
    out_buf[out_len - 1] = 0;
    cJSON_Delete(root);
    if (json) {
        free(json);
    }
}

static void build_json_redeem(uint32_t reward_id, char *out_buf, size_t out_len) {
    cJSON *root = cJSON_CreateObject();
    cJSON_AddStringToObject(root, "type", "redeem_reward");
    cJSON_AddStringToObject(root, "device_id", s_device_id);
    cJSON_AddNumberToObject(root, "reward_id", reward_id);
    char *json = cJSON_PrintUnformatted(root);
    strncpy(out_buf, json ? json : "{}", out_len - 1);
    out_buf[out_len - 1] = 0;
    cJSON_Delete(root);
    if (json) {
        free(json);
    }
}

static void handle_checkin_response(int status_code, const uint8_t *data, size_t len) {
    passport_event_t event;
    memset(&event, 0, sizeof(event));

    if (status_code != 200) {
        event.type = PASSPORT_EVENT_NETWORK_ERROR;
        snprintf(event.message, sizeof(event.message), "HTTP %d", status_code);
        emit_event(&event);
        return;
    }

    cJSON *root = cJSON_ParseWithLength((const char *)data, len);
    if (!root) {
        event.type = PASSPORT_EVENT_CHECKIN_FAILED;
        snprintf(event.message, sizeof(event.message), "Invalid response");
        emit_event(&event);
        return;
    }

    cJSON *success = cJSON_GetObjectItem(root, "success");
    if (!cJSON_IsBool(success) || !cJSON_IsTrue(success)) {
        cJSON *error = cJSON_GetObjectItem(root, "error");
        event.type = PASSPORT_EVENT_CHECKIN_FAILED;
        snprintf(event.message, sizeof(event.message), "%s", error ? error->valuestring : "Unknown error");
        emit_event(&event);
        cJSON_Delete(root);
        return;
    }

    cJSON *message = cJSON_GetObjectItem(root, "message");
    cJSON *data_obj = cJSON_GetObjectItem(root, "data");
    cJSON *location = data_obj ? cJSON_GetObjectItem(data_obj, "location") : NULL;
    cJSON *tokens = data_obj ? cJSON_GetObjectItem(data_obj, "total_tokens") : NULL;

    event.type = PASSPORT_EVENT_CHECKIN_SUCCESS;
    event.tokens_earned = 10;
    event.total_tokens = cJSON_IsNumber(tokens) ? (int32_t)tokens->valuedouble : 0;
    snprintf(event.message, sizeof(event.message), "%s", message ? message->valuestring : "打卡成功");
    snprintf(event.location, sizeof(event.location), "%s", location ? location->valuestring : "");
    emit_event(&event);

    cJSON_Delete(root);
}

static void handle_redeem_response(int status_code, const uint8_t *data, size_t len) {
    passport_event_t event;
    memset(&event, 0, sizeof(event));

    if (status_code != 200) {
        event.type = PASSPORT_EVENT_NETWORK_ERROR;
        snprintf(event.message, sizeof(event.message), "HTTP %d", status_code);
        emit_event(&event);
        return;
    }

    cJSON *root = cJSON_ParseWithLength((const char *)data, len);
    if (!root) {
        event.type = PASSPORT_EVENT_REDEEM_FAILED;
        snprintf(event.message, sizeof(event.message), "Invalid response");
        emit_event(&event);
        return;
    }

    cJSON *success = cJSON_GetObjectItem(root, "success");
    if (!cJSON_IsBool(success) || !cJSON_IsTrue(success)) {
        cJSON *error = cJSON_GetObjectItem(root, "error");
        event.type = PASSPORT_EVENT_REDEEM_FAILED;
        snprintf(event.message, sizeof(event.message), "%s", error ? error->valuestring : "Unknown error");
        emit_event(&event);
        cJSON_Delete(root);
        return;
    }

    cJSON *message = cJSON_GetObjectItem(root, "message");
    cJSON *data_obj = cJSON_GetObjectItem(root, "data");

    event.type = PASSPORT_EVENT_REDEEM_SUCCESS;
    snprintf(event.message, sizeof(event.message), "%s", message ? message->valuestring : "兑换成功");
    emit_event(&event);

    cJSON_Delete(root);
}

esp_err_t passport_controller_init(passport_event_handler_t handler) {
    s_handler = handler;
    offline_cache_init();
    ota_manager_init();
    ESP_LOGI(TAG, "Passport controller initialized with offline cache and OTA support");
    return ESP_OK;
}

esp_err_t passport_controller_deinit(void) {
    s_handler = NULL;
    offline_cache_deinit();
    ota_manager_deinit();
    return ESP_OK;
}

esp_err_t passport_controller_on_nfc_detected(const nfc_tag_info_t *tag) {
    if (!tag) {
        return ESP_ERR_INVALID_ARG;
    }

    char uid_str[24] = {0};
    for (size_t i = 0; i < tag->uid_len; i++) {
        sprintf(uid_str + strlen(uid_str), "%02X", tag->uid[i]);
    }

    char payload[256] = {0};
    build_json_checkin(uid_str, payload, sizeof(payload));

    if (!s_network_available) {
        ESP_LOGW(TAG, "Network not available, caching checkin request");
        offline_cache_add("nfc_checkin", payload);
        passport_event_t event;
        memset(&event, 0, sizeof(event));
        event.type = PASSPORT_EVENT_NETWORK_ERROR;
        snprintf(event.message, sizeof(event.message), "离线缓存中，等待网络恢复");
        emit_event(&event);
        return ESP_OK;
    }

    network_manager_http_post("/api/nfc/checkin", payload, handle_checkin_response, 5000);
    return ESP_OK;
}

esp_err_t passport_controller_request_balance(void) {
    char path[128] = {0};
    snprintf(path, sizeof(path), "/api/token/balance/%s", s_device_id);
    network_manager_http_get(path, NULL, 5000);
    return ESP_OK;
}

esp_err_t passport_controller_request_rewards(void) {
    network_manager_http_get("/api/rewards", NULL, 5000);
    return ESP_OK;
}

esp_err_t passport_controller_redeem_reward(uint32_t reward_id) {
    char body[128] = {0};
    build_json_redeem(reward_id, body, sizeof(body));

    if (!s_network_available) {
        ESP_LOGW(TAG, "Network not available, caching redeem request");
        offline_cache_add("redeem_reward", body);
        passport_event_t event;
        memset(&event, 0, sizeof(event));
        event.type = PASSPORT_EVENT_NETWORK_ERROR;
        snprintf(event.message, sizeof(event.message), "离线缓存中，等待网络恢复");
        emit_event(&event);
        return ESP_OK;
    }

    network_manager_http_post("/api/rewards/redeem", body, handle_redeem_response, 5000);
    return ESP_OK;
}

esp_err_t passport_controller_sync_state(void) {
    passport_controller_request_balance();
    passport_controller_request_rewards();
    return ESP_OK;
}

esp_err_t passport_controller_set_network_available(bool available) {
    s_network_available = available;
    if (available) {
        ESP_LOGI(TAG, "Network available, starting offline cache sync");
        offline_cache_sync_all();
    } else {
        ESP_LOGW(TAG, "Network unavailable");
    }
    return ESP_OK;
}

esp_err_t passport_controller_check_ota_update(const char *server_url, const char *current_version) {
    if (!s_network_available) {
        ESP_LOGW(TAG, "Network not available, skipping OTA check");
        return ESP_ERR_INVALID_STATE;
    }
    return ota_manager_check_update(server_url, current_version);
}

esp_err_t passport_controller_start_ota(const ota_image_info_t *image) {
    if (!s_network_available) {
        ESP_LOGW(TAG, "Network not available, cannot start OTA");
        return ESP_ERR_INVALID_STATE;
    }
    return ota_manager_start_update(image);
}

const char *passport_event_type_to_string(passport_event_type_t type) {
    switch (type) {
        case PASSPORT_EVENT_CHECKIN_SUCCESS: return "CHECKIN_SUCCESS";
        case PASSPORT_EVENT_CHECKIN_FAILED: return "CHECKIN_FAILED";
        case PASSPORT_EVENT_REDEEM_SUCCESS: return "REDEEM_SUCCESS";
        case PASSPORT_EVENT_REDEEM_FAILED: return "REDEEM_FAILED";
        case PASSPORT_EVENT_NETWORK_ERROR: return "NETWORK_ERROR";
        case PASSPORT_EVENT_INVALID_TAG: return "INVALID_TAG";
        default: return "UNKNOWN";
    }
}
