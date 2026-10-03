const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  try {
    const rewards = db.prepare('SELECT * FROM rewards WHERE is_active = 1 ORDER BY cost_tokens ASC').all();
    res.json({ success: true, data: rewards });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/redeem', [
  body('device_id').isString().notEmpty(),
  body('reward_id').isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { device_id, reward_id } = req.body;

    const device = db.prepare('SELECT * FROM devices WHERE device_id = ? AND is_active = 1').get(device_id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found or inactive' });
    }

    const reward = db.prepare('SELECT * FROM rewards WHERE id = ? AND is_active = 1').get(reward_id);
    if (!reward) {
      return res.status(404).json({ error: 'Reward not found or inactive' });
    }

    const totalTokens = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(device_id).total;

    if (totalTokens < reward.cost_tokens) {
      return res.status(400).json({ 
        error: 'Insufficient tokens',
        required: reward.cost_tokens,
        current: totalTokens
      });
    }

    if (reward.stock !== -1 && reward.stock <= 0) {
      return res.status(400).json({ error: 'Reward out of stock' });
    }

    const result = db.transaction(() => {
      const redemption = db.prepare(
        'INSERT INTO reward_redemptions (device_id, reward_id, tokens_spent) VALUES (?, ?, ?)'
      ).run(device_id, reward_id, reward.cost_tokens);

      db.prepare(
        'INSERT INTO token_transactions (device_id, amount, type, description, related_reward_id) VALUES (?, ?, ?, ?, ?)'
      ).run(
        device_id,
        -reward.cost_tokens,
        'spend',
        `兑换: ${reward.name}`,
        redemption.lastInsertRowid
      );

      if (reward.stock !== -1) {
        db.prepare('UPDATE rewards SET stock = stock - 1 WHERE id = ?').run(reward_id);
      }

      db.prepare('UPDATE devices SET last_seen = CURRENT_TIMESTAMP WHERE device_id = ?').run(device_id);

      return redemption.lastInsertRowid;
    })();

    const redemption = db.prepare('SELECT * FROM reward_redemptions WHERE id = ?').get(result);
    const remainingTokens = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(device_id).total;

    res.json({
      success: true,
      message: `兑换成功！消耗 ${reward.cost_tokens} Token`,
      data: {
        redemption_id: redemption.id,
        reward_name: reward.name,
        tokens_spent: redemption.tokens_spent,
        remaining_tokens: remainingTokens,
        status: redemption.status,
        created_at: redemption.created_at
      }
    });

  } catch (error) {
    console.error('Redeem error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
