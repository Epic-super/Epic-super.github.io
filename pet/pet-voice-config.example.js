/* 蕾娜语音 · 配置模板（提交本模板即可，不携带真实 key）
 * 复制为 pet-voice-config.js 使用；真实 key 写进那份本地文件，勿提交 git。
 *
 * plan 使用【音色复刻】获得 voice id（官方音色被 451 挡，复刻端点是可达的）：
 *   复刻：POST /step_plan/v1/audio/voices 传 5-10 秒参考音频 file_b64 或 file_id，
 *   把返回的 voice id 填到 voice 字段，并把 useStepFun 改为 true。
 */
window.PET_VOICE_CONFIG = {
  apiKey: "",                                // StepFun API Key
  baseUrl: "https://api.stepfun.com/step_plan/v1",
  model: "stepaudio-2.5-tts",
  voice: "",                                 // 复刻得到的 voice id
  responseFormat: "mp3",
  useStepFun: false,                         // 填好 voice 后改 true
  enabled: true,
  rate: 1.0,
  pitch: 1.05
};