#ifndef FOLOTOY_NFC_PASSPORT_OFFLINE_CACHE_H
#define FOLOTOY_NFC_PASSPORT_OFFLINE_CACHE_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>
#include "esp_system.h"

#ifdef __cplusplus
extern "C" {
#endif

#define OFFLINE_CACHE_MAX_ENTRIES    32
#define OFFLINE_CACHE_ENTRY_MAX_LEN  512
#define OFFLINE_CACHE_NAMESPACE      "offline_cache"

typedef enum {
    OFFLINE_STATUS_PENDING = 0,
    OFFLINE_STATUS_SYNCED = 1,
    OFFLINE_STATUS_FAILED = 2
} offline_cache_status_t;

typedef struct {
    uint32_t id;
    char type[32];
    char payload[OFFLINE_CACHE_ENTRY_MAX_LEN];
    uint32_t created_at;
    uint32_t retry_count;
    offline_cache_status_t status;
} offline_cache_entry_t;

typedef void (*offline_cache_event_cb_t)(const offline_cache_entry_t *entry, offline_cache_status_t status);

esp_err_t offline_cache_init(void);
esp_err_t offline_cache_deinit(void);
esp_err_t offline_cache_add(const char *type, const char *payload);
esp_err_t offline_cache_get_next(offline_cache_entry_t *entry);
esp_err_t offline_cache_remove(uint32_t id);
esp_err_t offline_cache_mark_synced(uint32_t id);
esp_err_t offline_cache_mark_failed(uint32_t id);
esp_err_t offline_cache_clear(void);
uint32_t offline_cache_pending_count(void);
esp_err_t offline_cache_register_event_cb(offline_cache_event_cb_t cb);
esp_err_t offline_cache_sync_all(void);

#ifdef __cplusplus
}
#endif

#endif
