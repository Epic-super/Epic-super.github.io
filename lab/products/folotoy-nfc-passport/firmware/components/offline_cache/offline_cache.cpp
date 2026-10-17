#include "offline_cache.h"
#include "esp_log.h"
#include "nvs.h"
#include "nvs_flash.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "string.h"

static const char *TAG = "offline_cache";

static bool s_initialized = false;
static nvs_handle_t s_handle = 0;
static offline_cache_event_cb_t s_event_cb = NULL;
static TaskHandle_t s_sync_task = NULL;

static esp_err_t ensure_handle(void) {
    if (s_handle) {
        return ESP_OK;
    }
    esp_err_t err = nvs_open(OFFLINE_CACHE_NAMESPACE, NVS_READWRITE, &s_handle);
    if (err != ESP_OK && err != ESP_ERR_NVS_NOT_FOUND) {
        return err;
    }
    if (err == ESP_ERR_NVS_NOT_FOUND) {
        err = nvs_open(OFFLINE_CACHE_NAMESPACE, NVS_READWRITE, &s_handle);
        if (err != ESP_OK) {
            return err;
        }
    }
    return ESP_OK;
}

static void emit_event(const offline_cache_entry_t *entry, offline_cache_status_t status) {
    if (s_event_cb) {
        s_event_cb(entry, status);
    }
}

static void sync_task(void *param) {
    ESP_LOGI(TAG, "Offline cache sync task started");
    offline_cache_entry_t entry;

    while (1) {
        if (offline_cache_get_next(&entry) == ESP_OK) {
            if (entry.status == OFFLINE_STATUS_PENDING) {
                ESP_LOGI(TAG, "Syncing entry id=%u type=%s", entry.id, entry.type);
                emit_event(&entry, OFFLINE_STATUS_SYNCED);
            } else if (entry.status == OFFLINE_STATUS_FAILED) {
                ESP_LOGI(TAG, "Retrying entry id=%u type=%s", entry.id, entry.type);
            }
        }

        vTaskDelay(pdMS_TO_TICKS(5000));
    }
}

esp_err_t offline_cache_init(void) {
    if (s_initialized) {
        return ESP_OK;
    }

    esp_err_t err = nvs_flash_init();
    if (err == ESP_ERR_NVS_NO_FREE_PAGES || err == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        err = nvs_flash_init();
    }
    ESP_ERROR_CHECK(err);

    err = ensure_handle();
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Failed to open NVS");
        return err;
    }

    s_initialized = true;
    ESP_LOGI(TAG, "Offline cache initialized");
    return ESP_OK;
}

esp_err_t offline_cache_deinit(void) {
    if (s_sync_task) {
        vTaskDelete(s_sync_task);
        s_sync_task = NULL;
    }
    if (s_handle) {
        nvs_close(s_handle);
        s_handle = 0;
    }
    s_initialized = false;
    return ESP_OK;
}

esp_err_t offline_cache_add(const char *type, const char *payload) {
    if (!s_initialized || !type || !payload) {
        return ESP_ERR_INVALID_ARG;
    }

    offline_cache_entry_t entry;
    memset(&entry, 0, sizeof(entry));
    entry.id = (uint32_t)xTaskGetTickCount();
    strncpy(entry.type, type, sizeof(entry.type) - 1);
    strncpy(entry.payload, payload, sizeof(entry.payload) - 1);
    entry.created_at = entry.id;
    entry.retry_count = 0;
    entry.status = OFFLINE_STATUS_PENDING;

    char key[16] = {0};
    snprintf(key, sizeof(key), "entry_%u", entry.id);

    esp_err_t err = nvs_set_blob(s_handle, key, &entry, sizeof(entry));
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Failed to save cache entry");
        return err;
    }

    err = nvs_commit(s_handle);
    if (err != ESP_OK) {
        ESP_LOGE(TAG, "Failed to commit cache entry");
        return err;
    }

    ESP_LOGI(TAG, "Added offline cache entry id=%u type=%s", entry.id, entry.type);
    emit_event(&entry, OFFLINE_STATUS_PENDING);
    return ESP_OK;
}

esp_err_t offline_cache_get_next(offline_cache_entry_t *entry) {
    if (!s_initialized || !entry) {
        return ESP_ERR_INVALID_ARG;
    }

    nvs_iterator_t it = nvs_entry_find(NVS_DEFAULT_PART_NAME, OFFLINE_CACHE_NAMESPACE, NVS_TYPE_BLOB);
    if (!it) {
        return ESP_ERR_NOT_FOUND;
    }

    for (;;) {
        nvs_entry_info_t info;
        nvs_entry_info(it, &info);
        if (strncmp(info.key, "entry_", 7) == 0) {
            size_t len = sizeof(offline_cache_entry_t);
            esp_err_t err = nvs_get_blob(s_handle, info.key, entry, &len);
            nvs_release_iterator(it);
            if (err == ESP_OK) {
                return ESP_OK;
            }
            return err;
        }
        it = nvs_entry_next(it);
        if (!it) {
            break;
        }
    }

    nvs_release_iterator(it);
    return ESP_ERR_NOT_FOUND;
}

esp_err_t offline_cache_remove(uint32_t id) {
    if (!s_initialized) {
        return ESP_ERR_INVALID_STATE;
    }

    char key[16] = {0};
    snprintf(key, sizeof(key), "entry_%u", id);

    esp_err_t err = nvs_erase_key(s_handle, key);
    if (err != ESP_OK) {
        return err;
    }

    return nvs_commit(s_handle);
}

esp_err_t offline_cache_mark_synced(uint32_t id) {
    if (!s_initialized) {
        return ESP_ERR_INVALID_STATE;
    }

    char key[16] = {0};
    snprintf(key, sizeof(key), "entry_%u", id);

    offline_cache_entry_t entry;
    size_t len = sizeof(entry);
    esp_err_t err = nvs_get_blob(s_handle, key, &entry, &len);
    if (err != ESP_OK) {
        return err;
    }

    entry.status = OFFLINE_STATUS_SYNCED;
    entry.retry_count += 1;

    err = nvs_set_blob(s_handle, key, &entry, sizeof(entry));
    if (err != ESP_OK) {
        return err;
    }

    return nvs_commit(s_handle);
}

esp_err_t offline_cache_mark_failed(uint32_t id) {
    if (!s_initialized) {
        return ESP_ERR_INVALID_STATE;
    }

    char key[16] = {0};
    snprintf(key, sizeof(key), "entry_%u", id);

    offline_cache_entry_t entry;
    size_t len = sizeof(entry);
    esp_err_t err = nvs_get_blob(s_handle, key, &entry, &len);
    if (err != ESP_OK) {
        return err;
    }

    entry.status = OFFLINE_STATUS_FAILED;
    entry.retry_count += 1;

    err = nvs_set_blob(s_handle, key, &entry, sizeof(entry));
    if (err != ESP_OK) {
        return err;
    }

    return nvs_commit(s_handle);
}

esp_err_t offline_cache_clear(void) {
    if (!s_initialized) {
        return ESP_ERR_INVALID_STATE;
    }

    esp_err_t err = nvs_erase_all(s_handle);
    if (err != ESP_OK) {
        return err;
    }

    return nvs_commit(s_handle);
}

uint32_t offline_cache_pending_count(void) {
    if (!s_initialized) {
        return 0;
    }

    uint32_t count = 0;
    nvs_iterator_t it = nvs_entry_find(NVS_DEFAULT_PART_NAME, OFFLINE_CACHE_NAMESPACE, NVS_TYPE_BLOB);
    if (!it) {
        return 0;
    }

    for (;;) {
        nvs_entry_info_t info;
        nvs_entry_info(it, &info);
        if (strncmp(info.key, "entry_", 7) == 0) {
            offline_cache_entry_t entry;
            size_t len = sizeof(entry);
            if (nvs_get_blob(s_handle, info.key, &entry, &len) == ESP_OK) {
                if (entry.status == OFFLINE_STATUS_PENDING || entry.status == OFFLINE_STATUS_FAILED) {
                    count++;
                }
            }
        }
        it = nvs_entry_next(it);
        if (!it) {
            break;
        }
    }

    nvs_release_iterator(it);
    return count;
}

esp_err_t offline_cache_register_event_cb(offline_cache_event_cb_t cb) {
    s_event_cb = cb;
    return ESP_OK;
}

esp_err_t offline_cache_sync_all(void) {
    if (!s_initialized) {
        return ESP_ERR_INVALID_STATE;
    }

    if (!s_sync_task) {
        BaseType_t ret = xTaskCreate(sync_task, "offline_sync", 4096, NULL, 4, &s_sync_task);
        if (ret != pdPASS) {
            ESP_LOGE(TAG, "Failed to create sync task");
            return ESP_FAIL;
        }
    }

    return ESP_OK;
}
