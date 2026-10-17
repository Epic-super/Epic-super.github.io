const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

router.post('/checkin', [
  body('device_id').isString().notEmpty(),
  body('tag_uid').isString().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { device_id, tag_uid } = req.body;

    const device = db.prepare('SELECT * FROM devices WHERE device_id = ? AND is_active = 1').get(device_id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found or inactive' });
    }

    const tag = db.prepare('SELECT * FROM nfc_tags WHERE tag_uid = ? AND is_active = 1').get(tag_uid);
    if (!tag) {
      return res.status(404).json({ error: 'Invalid or inactive NFC tag' });
    }

    const today = new Date().toISOString().split('T')[0];
    const checkinCount = db.prepare(
      'SELECT COUNT(*) as count FROM checkins WHERE device_id = ? AND tag_uid = ? AND DATE(checked_at) = ?'
    ).get(device_id, tag_uid, today);

    if (checkinCount.count >= tag.max_checkins_per_day) {
      return res.status(429).json({ 
        error: 'Already checked in at this location today',
        message: `今日已在${tag.location}打卡，明天再来吧！`
      });
    }

    const result = db.transaction(() => {
      const stmt = db.prepare(
        'INSERT INTO checkins (device_id, tag_uid, tokens_earned) VALUES (?, ?, ?)'
      );
      const info = stmt.run(device_id, tag_uid, tag.token_reward);

      db.prepare(
        'INSERT INTO token_transactions (device_id, amount, type, description, related_checkin_id) VALUES (?, ?, ?, ?, ?)'
      ).run(
        device_id,
        tag.token_reward,
        'earn',
        `打卡奖励: ${tag.location}`,
        info.lastInsertRowid
      );

      db.prepare('UPDATE devices SET last_seen = CURRENT_TIMESTAMP WHERE device_id = ?').run(device_id);

      return info.lastInsertRowid;
    })();

    const checkin = db.prepare('SELECT * FROM checkins WHERE id = ?').get(result);
    const tagInfo = db.prepare('SELECT * FROM nfc_tags WHERE tag_uid = ?').get(tag_uid);
    const totalTokens = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(device_id).total;

    res.json({
      success: true,
      message: `打卡成功！获得 ${tag.token_reward} Token`,
      data: {
        checkin_id: checkin.id,
        location: tagInfo.location,
        tokens_earned: checkin.tokens_earned,
        total_tokens: totalTokens,
        checked_at: checkin.checked_at
      }
    });

  } catch (error) {
    console.error('Checkin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tags', (req, res) => {
  try {
    const tags = db.prepare('SELECT * FROM nfc_tags WHERE is_active = 1').all();
    res.json({ success: true, data: tags });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/history/:device_id', (req, res) => {
  try {
    const { device_id } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const history = db.prepare(
      `SELECT c.*, t.location, t.tag_name 
       FROM checkins c 
       JOIN nfc_tags t ON c.tag_uid = t.tag_uid 
       WHERE c.device_id = ? 
       ORDER BY c.checked_at DESC 
       LIMIT ? OFFSET ?`
    ).all(device_id, parseInt(limit), parseInt(offset));

    res.json({ success: true, data: history });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
