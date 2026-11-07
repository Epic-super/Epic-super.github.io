idf_component_register(SRCS "offline_cache.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_log freertos nvs_flash)
