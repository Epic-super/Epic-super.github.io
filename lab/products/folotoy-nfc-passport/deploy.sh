# FOLOTOY NFC Passport 一键部署脚本

#!/bin/bash

set -e

echo "=========================================="
echo "  FOLOTOY NFC Passport System"
echo "  Docker Deployment Script"
echo "=========================================="
echo

if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh <admin-api-key>"
    echo "Example: ./deploy.sh my-secret-key-123"
    echo
    echo "This will start all services:"
    echo "  - NFC API Server (port 3000)"
    echo "  - WebSocket Server (port 8080)"
    echo "  - MQTT Broker (port 1883)"
    echo "  - Redis (port 6379)"
    echo "  - Nginx (port 80)"
    echo
    exit 1
fi

ADMIN_API_KEY=$1
COMPOSE_FILE="docker-compose.yml"

echo "Starting FOLOTOY NFC Passport System..."
echo "Admin API Key: ${ADMIN_API_KEY}"
echo

export ADMIN_API_KEY=${ADMIN_API_KEY}

docker-compose -f ${COMPOSE_FILE} up -d --build

echo
echo "Waiting for services to start..."
sleep 10

echo
echo "Checking service health..."
curl -s http://localhost:3000/api/health || echo "API not ready yet"

echo
echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
echo
echo "Access URLs:"
echo "  - API: http://localhost:3000/api"
echo "  - WebSocket: ws://localhost:8080"
echo "  - MQTT: localhost:1883"
echo "  - Web Admin: http://localhost/web"
echo "  - Health: http://localhost:3000/api/health"
echo
echo "Next steps:"
echo "  1. Visit http://localhost/web to see the admin dashboard"
echo "  2. Create your first device using API"
echo "  3. Configure NFC tags"
echo "  4. Test check-in flow"
echo
echo "To stop: docker-compose down"
echo "To view logs: docker-compose logs -f"
echo
