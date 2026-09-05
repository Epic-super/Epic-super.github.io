idf_component_register(SRCS "ota_manager.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_log esp_https_ota app_update freertos esp_timer)
