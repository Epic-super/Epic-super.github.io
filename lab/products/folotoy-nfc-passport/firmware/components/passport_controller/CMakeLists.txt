idf_component_register(SRCS "passport_controller.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES nfc_manager network_manager at_command_handler esp_log freertos cjson
                               offline_cache ota_manager)
