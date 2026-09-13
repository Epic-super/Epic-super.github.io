const db = require('../config/database');

const DEMO_DEVICES = [
  { device_id: 'device-demo-001', device_name: '演示设备A', owner_name: '张三' },
  { device_id: 'device-demo-002', device_name: '演示设备B', owner_name: '李四' },
  { device_id: 'device-demo-003', device_name: '演示设备C', owner_name: '王五' }
];

const DEMO_TAGS = [
  { tag_uid: '04A224B33C01', tag_name: '入口签到点', location: '主入口', token_reward: 10, max_checkins_per_day: 1 },
  { tag_uid: '04A224B33C02', tag_name: 'AI互动区', location: 'A区展台', token_reward: 15, max_checkins_per_day: 2 },
  { tag_uid: '04A224B33C03', tag_name: '工作坊', location: 'B区 workshop', token_reward: 20, max_checkins_per_day: 1 },
  { tag_uid: '04A224B33C04', tag_name: '闭幕打卡点', location: '闭幕舞台', token_reward: 25, max_checkins_per_day: 1 }
];

const DEMO_REWARDS = [
  { name: '大赛限定贴纸', description: 'TRAE AI 创造力大赛限定周边', cost_tokens: 20, stock: 100 },
  { name: 'FOLOTOY 钥匙扣', description: 'FOLOTOY 品牌周边', cost_tokens: 50, stock: 50 },
  { name: 'TRAE 速通卡', description: '7天速通 Pro 体验卡', cost_tokens: 120, stock: 30 },
  { name: '决赛纪念徽章', description: '决赛现场纪念章', cost_tokens: 80, stock: 0 }
];

function seedData() {
  console.log('Seeding demo data...\n');

  const deviceStmt = db.prepare(
    'INSERT OR REPLACE INTO devices (device_id, device_name, owner_name, is_active, last_seen) VALUES (?, ?, ?, ?, ?)'
  );
  DEMO_DEVICES.forEach(device => {
    deviceStmt.run(device.device_id, device.device_name, device.owner_name, 1, new Date().toISOString());
    console.log(`✓ Created device: ${device.device_name} (${device.device_id})`);
  });

  const tagStmt = db.prepare(
    'INSERT OR REPLACE INTO nfc_tags (tag_uid, tag_name, location, token_reward, max_checkins_per_day, is_active) VALUES (?, ?, ?, ?, ?, ?)'
  );
  DEMO_TAGS.forEach(tag => {
    tagStmt.run(tag.tag_uid, tag.tag_name, tag.location, tag.token_reward, tag.max_checkins_per_day, 1);
    console.log(`✓ Created NFC tag: ${tag.tag_name} @ ${tag.location}`);
  });

  const rewardStmt = db.prepare(
    'INSERT OR REPLACE INTO rewards (name, description, cost_tokens, stock, is_active) VALUES (?, ?, ?, ?, ?)'
  );
  DEMO_REWARDS.forEach(reward => {
    rewardStmt.run(reward.name, reward.description, reward.cost_tokens, reward.stock, 1);
    console.log(`✓ Created reward: ${reward.name} (${reward.cost_tokens} tokens)`);
  });

  console.log('\n==========================================');
  console.log('Demo data seeded successfully!');
  console.log('==========================================\n');

  console.log('Demo Devices:');
  DEMO_DEVICES.forEach(d => {
    console.log(`  - ${d.device_name}: ${d.device_id}`);
  });

  console.log('\nDemo NFC Tags (UIDs):');
  DEMO_TAGS.forEach(t => {
    console.log(`  - ${t.tag_name}: ${t.tag_uid} (${t.token_reward} tokens)`);
  });

  console.log('\nDemo Rewards:');
  DEMO_REWARDS.forEach(r => {
    console.log(`  - ${r.name}: ${r.cost_tokens} tokens (stock: ${r.stock})`);
  });
}

if (require.main === module) {
  try {
    seedData();
  } catch (error) {
    console.error('Failed to seed demo data:', error);
    process.exit(1);
  }
}

module.exports = { seedData, DEMO_DEVICES, DEMO_TAGS, DEMO_REWARDS };
