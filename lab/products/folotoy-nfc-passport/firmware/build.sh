#!/bin/bash
set -e

echo "=========================================="
echo "  FOLOTOY NFC Passport Firmware"
echo "  ESP-IDF Build Script"
echo "=========================================="
echo

if [ -z "$IDF_PATH" ]; then
    echo "ERROR: IDF_PATH environment variable is not set."
    echo "Please install ESP-IDF and source the export.sh script first."
    exit 1
fi

idf.py set-target esp32
idf.py install-deps
idf.py build

FLASH_PORT="${1:-/dev/ttyUSB0}"
echo
echo "Flashing firmware to ${FLASH_PORT} ..."
idf.py -p "${FLASH_PORT}" flash

echo
echo "=========================================="
echo "  Build Complete"
echo "=========================================="
echo
echo "Output files:"
echo "  - Firmware binary: build/folotoy_nfc_passport.bin"
echo "  - Bootloader: build/bootloader/bootloader.bin"
echo "  - Partition table: build/partition_table/partition-table.bin"
echo
echo "Monitor serial logs:"
echo "  idf.py -p ${FLASH_PORT} monitor"
