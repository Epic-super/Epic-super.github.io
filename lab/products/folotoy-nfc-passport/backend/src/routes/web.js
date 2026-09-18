const express = require('express');
const path = require('path');
const db = require('../config/database');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/provision', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/provision.html'));
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

router.get('/devices', (req, res) => {
  try {
    const devices = db.prepare('SELECT * FROM devices ORDER BY created_at DESC').all();
    res.json({ success: true, data: devices });
  } catch (error) {
    console.error('Get devices error:', error);
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

router.get('/rewards', (req, res) => {
  try {
    const rewards = db.prepare('SELECT * FROM rewards ORDER BY cost_tokens ASC').all();
    res.json({ success: true, data: rewards });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/redemptions', (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const redemptions = db.prepare(
      `SELECT r.*, d.device_name, rw.name as reward_name 
       FROM reward_redemptions r 
       JOIN devices d ON r.device_id = d.device_id 
       JOIN rewards rw ON r.reward_id = rw.id 
       ORDER BY r.created_at DESC 
       LIMIT ? OFFSET ?`
    ).all(parseInt(limit), parseInt(offset));

    res.json({ success: true, data: redemptions });
  } catch (error) {
    console.error('Get redemptions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
