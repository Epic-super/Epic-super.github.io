import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const FILE = fileURLToPath(new URL('./fireboy-watergirl.html', import.meta.url));
const html = readFileSync(FILE, 'utf8');
const m = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
console.log('script blocks:', m.length);
// 取最长的 script 块做语法检查
let best = '', idx = -1;
m.forEach((mm, i) => { if (mm[1].length > best.length) { best = mm[1]; idx = i; } });
console.log('longest block length:', best.length, 'index', idx);
writeFileSync(fileURLToPath(new URL('./_check.js', import.meta.url)), best, 'utf8');
// 关键标记是否存在
const marks = ['function updateBoxes', 'function tryPushBoxes', 'function drawCrate', 'function drawFan', 'function drawIce', "case 'B':", 'FAN_FORCE', 'onUpdraft(player)', 'isOnIce(player)', 'carryBoxRiders', '冰霜滑道', '箱庭谜题'];
for (const mk of marks) console.log((best.includes(mk) ? 'OK  ' : 'MISS') + '  ' + mk);
