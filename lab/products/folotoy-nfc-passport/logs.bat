echo "FOLOTOY NFC Passport Logs"
echo =========================
echo.
echo Available services:
echo   - nfc-api: Backend API and WebSocket server
echo   - mosquitto: MQTT broker
echo   - redis: Redis cache
echo   - nginx: Reverse proxy and static files
echo.
echo Usage:
echo   docker-compose logs -f nfc-api      # Backend logs
echo   docker-compose logs -f mosquitto    # MQTT logs
echo   docker-compose logs -f redis        # Redis logs
echo   docker-compose logs -f nginx        # Nginx logs
echo   docker-compose logs -f              # All logs
echo.

pause
