const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

router.post('/devices', (req, res) => {
  try {
    const { device_name, owner_name } = req.body;
    const device_id = uuidv4();

    db.prepare(
      'INSERT INTO devices (device_id, device_name, owner_name) VALUES (?, ?, ?)'
    ).run(device_id, device_name || 'Unnamed Device', owner_name || null);

    const device = db.prepare('SELECT * FROM devices WHERE device_id = ?').get(device_id);
    res.status(201).json({ success: true, data: device });
  } catch (error) {
    console.error('Create device error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/devices', (req, res) => {
  try {
    const devices = db.prepare('SELECT * FROM devices ORDER BY created_at DESC').all();
    res.json({ success: true, data: devices });
  } catch (error) {
    console.error('Get devices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/tags', (req, res) => {
  try {
    const { tag_uid, tag_name, location, token_reward, max_checkins_per_day } = req.body;

    db.prepare(
      'INSERT OR REPLACE INTO nfc_tags (tag_uid, tag_name, location, token_reward, max_checkins_per_day) VALUES (?, ?, ?, ?, ?)'
    ).run(tag_uid, tag_name, location, token_reward || 10, max_checkins_per_day || 1);

    const tag = db.prepare('SELECT * FROM nfc_tags WHERE tag_uid = ?').get(tag_uid);
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tags', (req, res) => {
  try {
    const tags = db.prepare('SELECT * FROM nfc_tags ORDER BY created_at DESC').all();
    res.json({ success: true, data: tags });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/rewards', (req, res) => {
  try {
    const { name, description, cost_tokens, stock } = req.body;

    const result = db.prepare(
      'INSERT INTO rewards (name, description, cost_tokens, stock) VALUES (?, ?, ?, ?)'
    ).run(name, description || null, cost_tokens, stock || -1);

    const reward = db.prepare('SELECT * FROM rewards WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, data: reward });
  } catch (error) {
    console.error('Create reward error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/rewards', (req, res) => {
  try {
    const rewards = db.prepare('SELECT * FROM rewards ORDER BY cost_tokens ASC').all();
    res.json({ success: true, data: rewards });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stats', (req, res) => {
  try {
    const totalDevices = db.prepare('SELECT COUNT(*) as count FROM devices').get().count;
    const totalCheckins = db.prepare('SELECT COUNT(*) as count FROM checkins').get().count;
    const totalRedemptions = db.prepare('SELECT COUNT(*) as count FROM reward_redemptions').get().count;
    const totalTokensIssued = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE amount > 0'
    ).get().total;

    res.json({
      success: true,
      data: {
        total_devices: totalDevices,
        total_checkins: totalCheckins,
        total_redemptions: totalRedemptions,
        total_tokens_issued: totalTokensIssued
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/checkins', (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const checkins = db.prepare(
      `SELECT c.*, d.device_name, t.location 
       FROM checkins c 
       JOIN devices d ON c.device_id = d.device_id 
       JOIN nfc_tags t ON c.tag_uid = t.tag_uid 
       ORDER BY c.checked_at DESC 
       LIMIT ? OFFSET ?`
    ).all(parseInt(limit), parseInt(offset));

    res.json({ success: true, data: checkins });
  } catch (error) {
    console.error('Get checkins error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
