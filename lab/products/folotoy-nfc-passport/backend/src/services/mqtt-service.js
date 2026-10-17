const mqtt = require('mqtt');
const db = require('./database');

const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
const MQTT_TOPIC_PREFIX = process.env.MQTT_TOPIC_PREFIX || 'folotoy/nfc';

const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
  console.log(`MQTT connected to ${MQTT_BROKER}`);
  client.subscribe(`${MQTT_TOPIC_PREFIX}/+/request`);
});

client.on('message', async (topic, message) => {
  try {
    const topicParts = topic.split('/');
    const deviceId = topicParts[2];
    const payload = JSON.parse(message.toString());
    
    console.log(`Received from ${deviceId}:`, payload.type);
    
    let response;
    switch (payload.type) {
      case 'nfc_checkin':
        response = await handleNfcCheckin(deviceId, payload.tag_uid);
        break;
      case 'get_balance':
        response = await handleGetBalance(deviceId);
        break;
      case 'get_rewards':
        response = await handleGetRewards();
        break;
      case 'redeem_reward':
        response = await handleRedeemReward(deviceId, payload.reward_id);
        break;
      default:
        response = { success: false, error: 'Unknown message type' };
    }
    
    client.publish(`${MQTT_TOPIC_PREFIX}/${deviceId}/response`, JSON.stringify(response));
  } catch (error) {
    console.error('MQTT message handling error:', error);
  }
});

async function handleNfcCheckin(deviceId, tagUid) {
  try {
    const device = db.prepare('SELECT * FROM devices WHERE device_id = ? AND is_active = 1').get(deviceId);
    if (!device) {
      return { success: false, error: 'Device not found or inactive' };
    }

    const tag = db.prepare('SELECT * FROM nfc_tags WHERE tag_uid = ? AND is_active = 1').get(tagUid);
    if (!tag) {
      return { success: false, error: 'Invalid or inactive NFC tag' };
    }

    const today = new Date().toISOString().split('T')[0];
    const checkinCount = db.prepare(
      'SELECT COUNT(*) as count FROM checkins WHERE device_id = ? AND tag_uid = ? AND DATE(checked_at) = ?'
    ).get(deviceId, tagUid, today);

    if (checkinCount.count >= tag.max_checkins_per_day) {
      return { 
        success: false, 
        error: 'Already checked in at this location today',
        message: `今日已在${tag.location}打卡，明天再来吧！`
      };
    }

    const result = db.transaction(() => {
      const stmt = db.prepare(
        'INSERT INTO checkins (device_id, tag_uid, tokens_earned) VALUES (?, ?, ?)'
      );
      const info = stmt.run(deviceId, tagUid, tag.token_reward);

      db.prepare(
        'INSERT INTO token_transactions (device_id, amount, type, description, related_checkin_id) VALUES (?, ?, ?, ?, ?)'
      ).run(
        deviceId,
        tag.token_reward,
        'earn',
        `打卡奖励: ${tag.location}`,
        info.lastInsertRowid
      );

      db.prepare('UPDATE devices SET last_seen = CURRENT_TIMESTAMP WHERE device_id = ?').run(deviceId);

      return info.lastInsertRowid;
    })();

    const checkin = db.prepare('SELECT * FROM checkins WHERE id = ?').get(result);
    const totalTokens = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(deviceId).total;

    return {
      success: true,
      message: `打卡成功！获得 ${tag.token_reward} Token`,
      data: {
        checkin_id: checkin.id,
        location: tag.location,
        tokens_earned: checkin.tokens_earned,
        total_tokens: totalTokens,
        checked_at: checkin.checked_at
      }
    };

  } catch (error) {
    console.error('MQTT NFC checkin error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

async function handleGetBalance(deviceId) {
  try {
    const total = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(deviceId);

    const transactions = db.prepare(
      'SELECT * FROM token_transactions WHERE device_id = ? ORDER BY created_at DESC LIMIT 10'
    ).all(deviceId);

    return {
      success: true,
      data: {
        device_id: deviceId,
        total_tokens: total.total,
        recent_transactions: transactions
      }
    };
  } catch (error) {
    console.error('MQTT get balance error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

async function handleGetRewards() {
  try {
    const rewards = db.prepare('SELECT * FROM rewards WHERE is_active = 1 ORDER BY cost_tokens ASC').all();
    return { success: true, data: rewards };
  } catch (error) {
    console.error('MQTT get rewards error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

async function handleRedeemReward(deviceId, rewardId) {
  try {
    const device = db.prepare('SELECT * FROM devices WHERE device_id = ? AND is_active = 1').get(deviceId);
    if (!device) {
      return { success: false, error: 'Device not found or inactive' };
    }

    const reward = db.prepare('SELECT * FROM rewards WHERE id = ? AND is_active = 1').get(rewardId);
    if (!reward) {
      return { success: false, error: 'Reward not found or inactive' };
    }

    const totalTokens = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(deviceId).total;

    if (totalTokens < reward.cost_tokens) {
      return { 
        success: false, 
        error: 'Insufficient tokens',
        required: reward.cost_tokens,
        current: totalTokens
      };
    }

    if (reward.stock !== -1 && reward.stock <= 0) {
      return { success: false, error: 'Reward out of stock' };
    }

    const result = db.transaction(() => {
      const redemption = db.prepare(
        'INSERT INTO reward_redemptions (device_id, reward_id, tokens_spent) VALUES (?, ?, ?)'
      ).run(deviceId, rewardId, reward.cost_tokens);

      db.prepare(
        'INSERT INTO token_transactions (device_id, amount, type, description, related_reward_id) VALUES (?, ?, ?, ?, ?)'
      ).run(
        deviceId,
        -reward.cost_tokens,
        'spend',
        `兑换: ${reward.name}`,
        redemption.lastInsertRowid
      );

      if (reward.stock !== -1) {
        db.prepare('UPDATE rewards SET stock = stock - 1 WHERE id = ?').run(rewardId);
      }

      db.prepare('UPDATE devices SET last_seen = CURRENT_TIMESTAMP WHERE device_id = ?').run(deviceId);

      return redemption.lastInsertRowid;
    })();

    const redemption = db.prepare('SELECT * FROM reward_redemptions WHERE id = ?').get(result);

    return {
      success: true,
      message: `兑换成功！消耗 ${reward.cost_tokens} Token`,
      data: {
        redemption_id: redemption.id,
        reward_name: reward.name,
        tokens_spent: redemption.tokens_spent,
        status: redemption.status,
        created_at: redemption.created_at
      }
    };

  } catch (error) {
    console.error('MQTT redeem reward error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

process.on('SIGINT', () => {
  console.log('\nShutting down MQTT service...');
  client.end();
  process.exit(0);
});

module.exports = client;
