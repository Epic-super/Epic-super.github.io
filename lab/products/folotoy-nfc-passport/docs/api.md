# API 接口文档

基础路径：`http://localhost:3000/api`

## 通用说明

- 除特别说明外，所有接口都需要 JSON Body
- 成功返回 `{ success: true, data: ... }`
- 失败返回 `{ error: "错误信息", data?: ... }`
- 需要认证的接口请在 Header 中携带 `Authorization: Bearer <API_KEY>`

## 1. 健康检查

```
GET /api/health
```

响应示例：
```json
{
  "status": "ok",
  "timestamp": 1700000000000
}
```

## 2. NFC 打卡

```
POST /api/nfc/checkin
Body: { "device_id": "string", "tag_uid": "string" }
```

响应示例：
```json
{
  "success": true,
  "message": "打卡成功！获得 10 Token",
  "data": {
    "checkin_id": 1,
    "location": "展位A",
    "tokens_earned": 10,
    "total_tokens": 120,
    "checked_at": "2026-08-27 10:00:00"
  }
}
```

错误码：
- `400`：参数错误
- `404`：设备不存在或标签不存在
- `429`：今日已打卡

## 3. 查询 NFC 标签列表

```
GET /api/nfc/tags
```

响应示例：
```json
{
  "success": true,
  "data": [
    {
      "tag_uid": "04A224B33C",
      "tag_name": "展位A",
      "location": "创造力大道-入口",
      "token_reward": 10,
      "max_checkins_per_day": 1
    }
  ]
}
```

## 4. 查询打卡历史

```
GET /api/nfc/history/:device_id?limit=20&offset=0
```

响应示例：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "device_id": "device-xxx",
      "tag_uid": "04A224B33C",
      "tokens_earned": 10,
      "checked_at": "2026-08-27 10:00:00",
      "location": "展位A",
      "tag_name": "展位A"
    }
  ]
}
```

## 5. 查询 Token 余额

```
GET /api/token/balance/:device_id
```

响应示例：
```json
{
  "success": true,
  "data": {
    "device_id": "device-xxx",
    "total_tokens": 120,
    "recent_transactions": [...]
  }
}
```

## 6. 查询交易流水

```
GET /api/token/transactions/:device_id?limit=50&offset=0
```

## 7. 查询可兑换奖品

```
GET /api/rewards
```

响应示例：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "大赛限定贴纸",
      "description": "TRAE AI 创造力大赛限定周边",
      "cost_tokens": 20,
      "stock": 100
    }
  ]
}
```

## 8. 兑换奖品

```
POST /api/rewards/redeem
Body: { "device_id": "string", "reward_id": 1 }
```

响应示例：
```json
{
  "success": true,
  "message": "兑换成功！消耗 20 Token",
  "data": {
    "redemption_id": 1,
    "reward_name": "大赛限定贴纸",
    "tokens_spent": 20,
    "remaining_tokens": 100,
    "status": "pending",
    "created_at": "2026-08-27 10:05:00"
  }
}
```

错误码：
- `400`：Token 不足或奖品缺货
- `404`：设备或奖品不存在

## 9. 管理接口（需要 API Key）

Header 需携带：`Authorization: Bearer <ADMIN_API_KEY>`

### 创建设备
```
POST /api/admin/devices
Body: { "device_name": "string", "owner_name": "string" }
```

### 创建 NFC 标签
```
POST /api/admin/tags
Body: { "tag_uid": "string", "tag_name": "string", "location": "string", "token_reward": 10, "max_checkins_per_day": 1 }
```

### 创建奖品
```
POST /api/admin/rewards
Body: { "name": "string", "description": "string", "cost_tokens": 20, "stock": 100 }
```

### 查看统计
```
GET /api/admin/stats
```

响应示例：
```json
{
  "success": true,
  "data": {
    "total_devices": 150,
    "total_checkins": 3420,
    "total_redemptions": 128,
    "total_tokens_issued": 34200
  }
}
```

### 查看所有打卡记录
```
GET /api/admin/checkins?limit=50&offset=0
```
