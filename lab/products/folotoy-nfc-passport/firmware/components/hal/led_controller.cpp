idf_component_register(SRCS "led_controller.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_log driver esp_timer freertos)
