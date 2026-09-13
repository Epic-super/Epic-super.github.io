idf_component_register(SRCS "network_manager.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_log esp_http_client mqtt esp_websocket_client freertos esp_timer)
