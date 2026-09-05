const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const nfcRoutes = require('./routes/nfc');
const tokenRoutes = require('./routes/token');
const rewardRoutes = require('./routes/rewards');
const adminRoutes = require('./routes/admin');
const webRoutes = require('./routes/web');
const { mqttService } = require('./services/mqtt-service');
const { wss } = require('./services/websocket-service');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use('/api/nfc', nfcRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/web', webRoutes);
app.use('/ws', express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 FOLOTOY NFC Passport API Server running on port ${PORT}`);
  console.log(`📡 WebSocket Server running on ws://localhost:${process.env.WS_PORT || 8080}`);
  console.log(`🔌 MQTT Broker: ${process.env.MQTT_BROKER || 'mqtt://localhost:1883'}`);
});

module.exports = app;
