# 民航旅客体验深度解析平台（workbench 集成版）

来源：上海市计算机大赛参赛项目 `<本机项目数据目录>`（MVP，零依赖可运行系统）。
本目录是其在工作台 `lab/products/` 下的集成副本（后端耦合全功能模式）。

## 运行
双击 `start.bat`，或：
```
cd lab/products/airline-experience
python server/app.py
```
启动后打开 http://localhost:5000 ；工作台内从 `lab/products/airline-experience.html` 进入（iframe 嵌入，自动检测后端）。

## 目录结构
- `server/app.py` —— 标准库 http.server 后端（REST API + 托管前端），端口 5000
- `build/` —— React + ECharts 前端（已 `npm run build`）
- `pipeline/results/*.json` —— 预计算结果（情感 / 主题 / 维度 / 词云 / 航司 / 优先级 / 趋势 / 可解释性）
- `pipeline/dimensions.py` —— 5 大业务维度关键词归类
- `words.txt` —— 分段词云词表

## 重要说明
- **结构化语料未进仓库**：`structured.jsonl`（约 402MB / 89 万条，供 year/region/route/airline 实时筛选）
  体积过大不入库。后端启动后会**自动回退**到本机原竞赛目录
  `<本机项目数据目录>/pipeline/data/structured.jsonl`。
  - 该目录存在（本机）→ 实时筛选全功能；
  - 不存在（如公开部署/其他设备）→ 仅全局 / 航司 / 无筛选视图可用，筛选视图优雅降级为空。
- **训练权重未复制**：`pipeline/models/`（BERT/IAN 权重约 682MB）不在此副本中；
  看板展示的是已预计算并落盘的 metrics（bert_metrics.json / ian_metrics.json），无需权重即可查看。
- **公开部署**：GitHub Pages 无本地后端，看板页会提示「后端未启动」，需本机运行后端方可查看。
