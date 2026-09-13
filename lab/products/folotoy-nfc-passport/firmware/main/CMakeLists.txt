idf_component_register(SRCS "main.cpp" "config.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_system esp_wifi esp_event nvs_flash esp_netif
                               nfc_manager at_command_handler network_manager passport_controller
                               hal audio_manager led_controller button_manager
                               offline_cache ota_manager ble_provisioning)
