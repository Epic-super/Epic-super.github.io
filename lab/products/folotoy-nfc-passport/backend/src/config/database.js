const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/folotoy-nfc.db');

const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS devices (
    device_id TEXT PRIMARY KEY,
    device_name TEXT,
    owner_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME,
    is_active BOOLEAN DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS nfc_tags (
    tag_uid TEXT PRIMARY KEY,
    tag_name TEXT,
    location TEXT,
    token_reward INTEGER DEFAULT 10,
    max_checkins_per_day INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS checkins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    tag_uid TEXT NOT NULL,
    tokens_earned INTEGER DEFAULT 0,
    checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(device_id),
    FOREIGN KEY (tag_uid) REFERENCES nfc_tags(tag_uid)
  );

  CREATE TABLE IF NOT EXISTS token_transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    related_checkin_id INTEGER,
    related_reward_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
  );

  CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    cost_tokens INTEGER NOT NULL,
    stock INTEGER DEFAULT -1,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reward_redemptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    reward_id INTEGER NOT NULL,
    tokens_spent INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    fulfilled_at DATETIME,
    FOREIGN KEY (device_id) REFERENCES devices(device_id),
    FOREIGN KEY (reward_id) REFERENCES rewards(id)
  );

  CREATE INDEX IF NOT EXISTS idx_checkins_device ON checkins(device_id);
  CREATE INDEX IF NOT EXISTS idx_checkins_tag ON checkins(tag_uid);
  CREATE INDEX IF NOT EXISTS idx_token_transactions_device ON token_transactions(device_id);
  CREATE INDEX IF NOT EXISTS idx_reward_redemptions_device ON reward_redemptions(device_id);
`);

console.log('Database initialized at:', dbPath);

module.exports = db;
