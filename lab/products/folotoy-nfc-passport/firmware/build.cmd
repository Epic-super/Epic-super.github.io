@echo off
echo ==========================================
echo   FOLOTOY NFC Passport Firmware
echo   ESP-IDF Build Script (Windows)
echo ==========================================
echo.

setlocal

if not defined IDF_PATH (
    echo ERROR: IDF_PATH environment variable is not set.
    echo Please install ESP-IDF and run the export scripts first.
    pause
    exit /b 1
)

echo [1/4] Setting target to ESP32...
call idf.py set-target esp32

echo.
echo [2/4] Installing dependencies...
call idf.py install-deps

echo.
echo [3/4] Building firmware...
call idf.py build

echo.
echo [4/4] Flashing firmware...
set FLASH_BAUD=921600
set FLASH_PORT=%1
if "%FLASH_PORT%"=="" (
    echo No serial port specified, listing available ports:
    powershell -Command "[System.IO.Ports.SerialPort]::getportnames()"
    echo.
    set /p FLASH_PORT=Enter COM port:
)

call idf.py -p %FLASH_PORT% flash

echo.
echo ==========================================
echo   Build Complete
echo ==========================================
echo.
echo Output files:
echo   - Firmware binary: build\folotoy_nfc_passport.bin
echo   - Bootloader: build\bootloader\bootloader.bin
echo   - Partition table: build\partition_table\partition-table.bin
echo.
echo Monitor serial logs:
echo   idf.py -p %FLASH_PORT% monitor
echo.

pause
