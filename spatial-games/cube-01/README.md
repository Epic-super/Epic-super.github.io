# 立方塊算數練習

一個使用 Three.js 開發的 3D 立方塊計數練習遊戲，訓練空間感知與立體幾何能力。

**展示網址：** https://idben.github.io/cube-01/

## 遊戲玩法

1. 觀察畫面上的 3D 立方塊結構
2. 計算結構中總共有多少個立方塊（包含被遮擋的部分）
3. 輸入答案並提交
4. 答錯時可以拖曳旋轉結構來觀察
5. 完成 10 題即過關

## 功能特色

- 隨機生成連通的立方塊結構（6-15 個方塊）
- 重力模擬系統，無懸空立方塊
- 正交投影，清晰呈現立體結構
- 支援滑鼠拖曳和觸控旋轉
- 答對/答錯/過關音效回饋
- 可愛角色圖片互動
- 響應式設計，支援桌面、平板、手機

## 技術架構

- **Three.js v0.170.0** - 3D 渲染引擎
- **Web Audio API** - 音效系統
- **ES Modules** - 模組化 JavaScript
- **HTML5 Dialog** - 原生對話框
- **CSS3** - 動畫和響應式設計

## 使用方式

直接用瀏覽器開啟 `index.html` 即可遊玩。

或使用本地伺服器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve
```

然後開啟 http://localhost:8000

## 檔案結構

```
cube-01/
├── index.html      # 主頁面
├── style.css       # 樣式表
├── script.js       # 遊戲邏輯
├── images/         # 圖片資源
│   ├── happy.png   # 答對角色圖
│   ├── sad.png     # 答錯角色圖
│   └── pass.png    # 過關角色圖
└── README.md       # 說明文件
```

## 瀏覽器支援

- Chrome (推薦)
- Firefox
- Safari
- Edge

## 授權

MIT License
