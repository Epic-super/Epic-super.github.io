const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/database');
const { seedData, clearData } = require('../src/scripts/seed-demo-data');

beforeAll(() => {
  db.pragma('foreign_keys = ON');
});

afterAll(() => {
  db.close();
});

describe('NFC Passport API', () => {
  beforeEach(() => {
    seedData();
  });

  afterEach(() => {
    clearData();
  });

  describe('Health Check', () => {
    it('should return ok status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('NFC Checkin', () => {
    it('should successfully checkin with valid tag', async () => {
      const response = await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('打卡成功');
      expect(response.body.data.tokens_earned).toBe(10);
      expect(response.body.data.total_tokens).toBe(10);
    });

    it('should fail with invalid device', async () => {
      const response = await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'invalid-device',
          tag_uid: '04A224B33C01'
        })
        .expect(404);
      
      expect(response.body.error).toBeDefined();
    });

    it('should fail with invalid tag', async () => {
      const response = await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: 'invalid-tag'
        })
        .expect(404);
      
      expect(response.body.error).toBeDefined();
    });

    it('should prevent duplicate checkin at same location', async () => {
      await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(200);

      const response = await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(429);
      
      expect(response.body.error).toBeDefined();
    });
  });

  describe('Token Balance', () => {
    it('should return zero balance for new device', async () => {
      const response = await request(app)
        .get('/api/token/balance/device-demo-001')
        .expect(200);
      
      expect(response.body.data.total_tokens).toBe(0);
    });

    it('should return updated balance after checkin', async () => {
      await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(200);

      const response = await request(app)
        .get('/api/token/balance/device-demo-001')
        .expect(200);
      
      expect(response.body.data.total_tokens).toBe(10);
    });
  });

  describe('Rewards', () => {
    it('should list all active rewards', async () => {
      const response = await request(app)
        .get('/api/rewards')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('cost_tokens');
    });

    it('should successfully redeem reward with sufficient tokens', async () => {
      await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(200);

      const response = await request(app)
        .post('/api/rewards/redeem')
        .send({
          device_id: 'device-demo-001',
          reward_id: 1
        })
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('兑换成功');
    });

    it('should fail to redeem with insufficient tokens', async () => {
      const response = await request(app)
        .post('/api/rewards/redeem')
        .send({
          device_id: 'device-demo-001',
          reward_id: 1
        })
        .expect(400);
      
      expect(response.body.error).toBe('Insufficient tokens');
    });
  });

  describe('Web Admin', () => {
    it('should return stats', async () => {
      await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(200);

      const response = await request(app)
        .get('/web/stats')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.total_devices).toBeGreaterThan(0);
      expect(response.body.data.total_checkins).toBeGreaterThan(0);
    });

    it('should return checkin history', async () => {
      await request(app)
        .post('/api/nfc/checkin')
        .send({
          device_id: 'device-demo-001',
          tag_uid: '04A224B33C01'
        })
        .expect(200);

      const response = await request(app)
        .get('/web/checkins')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });
});

describe('Demo Scenario', () => {
  it('should complete a full user journey', async () => {
    const deviceId = 'device-demo-001';
    
    const checkin1 = await request(app)
      .post('/api/nfc/checkin')
      .send({ device_id: deviceId, tag_uid: '04A224B33C01' })
      .expect(200);
    expect(checkin1.body.data.total_tokens).toBe(10);

    const checkin2 = await request(app)
      .post('/api/nfc/checkin')
      .send({ device_id: deviceId, tag_uid: '04A224B33C02' })
      .expect(200);
    expect(checkin2.body.data.total_tokens).toBe(25);

    const balance = await request(app)
      .get(`/api/token/balance/${deviceId}`)
      .expect(200);
    expect(balance.body.data.total_tokens).toBe(25);

    const redeem = await request(app)
      .post('/api/rewards/redeem')
      .send({ device_id: deviceId, reward_id: 2 })
      .expect(400);
    expect(redeem.body.error).toBe('Insufficient tokens');

    const redeemSuccess = await request(app)
      .post('/api/rewards/redeem')
      .send({ device_id: deviceId, reward_id: 1 })
      .expect(200);
    expect(redeemSuccess.body.data.tokens_spent).toBe(20);

    const finalBalance = await request(app)
      .get(`/api/token/balance/${deviceId}`)
      .expect(200);
    expect(finalBalance.body.data.total_tokens).toBe(5);
  });
});
