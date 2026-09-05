const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/balance/:device_id', (req, res) => {
  try {
    const { device_id } = req.params;

    const device = db.prepare('SELECT * FROM devices WHERE device_id = ?').get(device_id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    const total = db.prepare(
      'SELECT COALESCE(SUM(amount), 0) as total FROM token_transactions WHERE device_id = ?'
    ).get(device_id);

    const transactions = db.prepare(
      'SELECT * FROM token_transactions WHERE device_id = ? ORDER BY created_at DESC LIMIT 10'
    ).all(device_id);

    res.json({
      success: true,
      data: {
        device_id,
        total_tokens: total.total,
        recent_transactions: transactions
      }
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/transactions/:device_id', (req, res) => {
  try {
    const { device_id } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const transactions = db.prepare(
      'SELECT * FROM token_transactions WHERE device_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
    ).all(device_id, parseInt(limit), parseInt(offset));

    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
