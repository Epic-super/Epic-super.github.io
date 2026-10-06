const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const WS_PORT = process.env.WS_PORT || 8080;
const API_BASE = process.env.API_BASE || 'http://localhost:3000/api';

const wss = new WebSocket.Server({ port: WS_PORT });

console.log(`FOLOTOY NFC Passport Device WebSocket Server running on ws://localhost:${WS_PORT}`);

const deviceRegistry = new Map();

wss.on('connection', (ws, req) => {
  const deviceId = uuidv4();
  const deviceInfo = {
    id: deviceId,
    ws,
    connectedAt: new Date(),
    lastActivity: new Date()
  };
  
  deviceRegistry.set(deviceId, deviceInfo);
  console.log(`Device connected: ${deviceId}`);

  ws.send(JSON.stringify({
    type: 'init',
    device_id: deviceId,
    message: 'Device initialized successfully'
  }));

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      deviceInfo.lastActivity = new Date();
      await handleDeviceMessage(ws, deviceId, message);
    } catch (error) {
      console.error('Invalid message:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log(`Device disconnected: ${deviceId}`);
    deviceRegistry.delete(deviceId);
  });

  ws.on('pong', () => {
    deviceInfo.lastActivity = new Date();
  });
});

async function handleDeviceMessage(ws, deviceId, message) {
  switch (message.type) {
    case 'nfc_detected':
      await handleNfcCheckin(ws, deviceId, message.tag_uid);
      break;
    case 'get_balance':
      await handleGetBalance(ws, deviceId);
      break;
    case 'get_rewards':
      await handleGetRewards(ws);
      break;
    case 'redeem_reward':
      await handleRedeemReward(ws, deviceId, message.reward_id);
      break;
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong' }));
      break;
    default:
      ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
  }
}

async function handleNfcCheckin(ws, deviceId, tagUid) {
  try {
    const response = await fetch(`${API_BASE}/nfc/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: deviceId,
        tag_uid: tagUid
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      ws.send(JSON.stringify({
        type: 'checkin_success',
        message: result.message,
        data: result.data
      }));
    } else {
      ws.send(JSON.stringify({
        type: 'checkin_failed',
        message: result.error || result.message || 'Checkin failed',
        data: result.data
      }));
    }
  } catch (error) {
    console.error('Checkin error:', error);
    ws.send(JSON.stringify({
      type: 'checkin_failed',
      message: 'Network error'
    }));
  }
}

async function handleGetBalance(ws, deviceId) {
  try {
    const response = await fetch(`${API_BASE}/token/balance/${deviceId}`);
    const result = await response.json();

    if (response.ok) {
      ws.send(JSON.stringify({
        type: 'balance_info',
        data: result.data
      }));
    } else {
      ws.send(JSON.stringify({
        type: 'error',
        message: result.error || 'Failed to get balance'
      }));
    }
  } catch (error) {
    console.error('Get balance error:', error);
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Network error'
    }));
  }
}

async function handleGetRewards(ws) {
  try {
    const response = await fetch(`${API_BASE}/rewards`);
    const result = await response.json();

    if (response.ok) {
      ws.send(JSON.stringify({
        type: 'rewards_list',
        data: result.data
      }));
    } else {
      ws.send(JSON.stringify({
        type: 'error',
        message: result.error || 'Failed to get rewards'
      }));
    }
  } catch (error) {
    console.error('Get rewards error:', error);
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Network error'
    }));
  }
}

async function handleRedeemReward(ws, deviceId, rewardId) {
  try {
    const response = await fetch(`${API_BASE}/rewards/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: deviceId,
        reward_id: rewardId
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      ws.send(JSON.stringify({
        type: 'redeem_success',
        message: result.message,
        data: result.data
      }));
    } else {
      ws.send(JSON.stringify({
        type: 'redeem_failed',
        message: result.error || 'Redemption failed',
        data: result.data
      }));
    }
  } catch (error) {
    console.error('Redeem error:', error);
    ws.send(JSON.stringify({
      type: 'redeem_failed',
      message: 'Network error'
    }));
  }
}

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options_ = {
      ...options,
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: options.method || 'GET'
    };

    const req = http.request(options_, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          json: () => Promise.resolve(JSON.parse(data))
        });
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

setInterval(() => {
  const now = new Date();
  for (const [deviceId, deviceInfo] of deviceRegistry) {
    if (now - deviceInfo.lastActivity > 5 * 60 * 1000) {
      console.log(`Device timeout: ${deviceId}`);
      deviceInfo.ws.send(JSON.stringify({ type: 'timeout', message: 'Connection timeout' }));
      deviceInfo.ws.terminate();
      deviceRegistry.delete(deviceId);
    }
  }
}, 60000);

process.on('SIGINT', () => {
  console.log('\nShutting down WebSocket server...');
  wss.close(() => {
    process.exit(0);
  });
});

module.exports = { wss, deviceRegistry };
