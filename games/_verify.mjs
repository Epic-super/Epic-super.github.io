import { readFileSync, writeFileSync } from 'node:fs';
const FILE = 'C:/Users/以梦为马的橘子/WorkBuddy/自考-考研/_master/games/fireboy-watergirl.html';
const html = readFileSync(FILE, 'utf8');
const m = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
console.log('script blocks:', m.length);
// 取最长的 script 块做语法检查
let best = '', idx = -1;
m.forEach((mm, i) => { if (mm[1].length > best.length) { best = mm[1]; idx = i; } });
console.log('longest block length:', best.length, 'index', idx);
writeFileSync('C:/Users/以梦为马的橘子/WorkBuddy/自考-考研/_master/games/_check.js', best, 'utf8');
// 关键标记是否存在
const marks = ['function updateBoxes', 'function tryPushBoxes', 'function drawCrate', 'function drawFan', 'function drawIce', "case 'B':", 'FAN_FORCE', 'onUpdraft(player)', 'isOnIce(player)', 'carryBoxRiders', '冰霜滑道', '箱庭谜题'];
for (const mk of marks) console.log((best.includes(mk) ? 'OK  ' : 'MISS') + '  ' + mk);
