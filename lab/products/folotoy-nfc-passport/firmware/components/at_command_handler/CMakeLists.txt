idf_component_register(SRCS "at_command_handler.cpp"
                    INCLUDE_DIRS "."
                    REQUIRES esp_log driver freertos esp_system)
