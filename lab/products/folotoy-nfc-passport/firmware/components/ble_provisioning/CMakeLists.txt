idf_component_register(SRCS "ble_provisioning.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_log esp_bt esp_gap_ble esp_gatts esp_wifi freertos)
