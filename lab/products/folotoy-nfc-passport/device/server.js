const http = require('http');
const WebSocket = require('ws');

const WS_PORT = process.env.WS_PORT || 8080;
const API_BASE = process.env.API_BASE || 'http://localhost:3000/api';

const wss = new WebSocket.Server({ port: WS_PORT });

console.log(`FOLOTOY NFC Passport Device Server running on ws://localhost:${WS_PORT}`);

const DEVICE_ID = 'device-' + Date.now();

wss.on('connection', (ws, req) => {
  console.log('New device connected');

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      await handleDeviceMessage(ws, message);
    } catch (error) {
      console.error('Invalid message:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log('Device disconnected');
  });

  ws.send(JSON.stringify({
    type: 'init',
    device_id: DEVICE_ID,
    message: 'Device initialized successfully'
  }));
});

async function handleDeviceMessage(ws, message) {
  switch (message.type) {
    case 'nfc_detected':
      await handleNfcCheckin(ws, message.tag_uid);
      break;
    case 'get_balance':
      await handleGetBalance(ws, message.device_id);
      break;
    case 'get_rewards':
      await handleGetRewards(ws);
      break;
    case 'redeem_reward':
      await handleRedeemReward(ws, message.reward_id);
      break;
    default:
      ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
  }
}

async function handleNfcCheckin(ws, tagUid) {
  try {
    const response = await fetch(`${API_BASE}/nfc/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: DEVICE_ID,
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
    const response = await fetch(`${API_BASE}/token/balance/${deviceId || DEVICE_ID}`);
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

async function handleRedeemReward(ws, rewardId) {
  try {
    const response = await fetch(`${API_BASE}/rewards/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        device_id: DEVICE_ID,
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
