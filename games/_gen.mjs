// 森林冰火人：扩充机关（推箱子 / 冰面 / 风扇气流）+ 两关新关卡
// 用法：node _gen.mjs   -> 先校验新关卡可达性，通过则原子注入全部改动到 fireboy-watergirl.html
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'C:/Users/以梦为马的橘子/WorkBuddy/自考-考研/_master/games/fireboy-watergirl.html';
// 原文件为 CRLF 行尾，先归一化为 LF 以便锚点（均以 \n 结尾）精确匹配；写出时整体转回 CRLF 保持仓库一致。
let html = readFileSync(FILE, 'utf8').replace(/\r\n/g, '\n');

/* ============ 新关卡设计 ============ */
// 宽度统一 24。地图符号：
//  # 墙  . 空地  f 火人出生 w 水妹出生  o 晶体  R 火门 U 水门
//  1/2 压力板(a/b门)  a/b 机关门  * 弹簧板  ~ 水坑 ^ 火焰 x 尖刺
//  _ 冰面(打滑)  v 风扇气流(上升)  B 可推箱子
const L1 = {
  name: '冰霜滑道',
  hint: '走进右侧蓝色风柱(站到 v 上)会被气流托上柱顶，够到高处火宝石；地面冰面(_)打滑提前起跳。冰面+风扇气流(v)登场。',
  map: [
    '########################',
    '#f...................w.#',
    '#......................#',
    '#........o.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#R___....v.....o..U....#',
    '########################',
  ],
  hardMap: [
    '########################',
    '#f...................w.#',
    '#......................#',
    '#........o.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#........v.............#',
    '#R___....v.....o..U....#',
    '########################',
  ],
  platforms: [],
  hardPlatforms: [],
};

const L2 = {
  name: '箱庭谜题',
  hint: '把木箱(B)推到压力板(1)上，中间的机关门(a)才会开。火人推箱开路、过门去右上的红门。推箱子(B)+压力板(1)+门(a)。',
  map: [
    '########################',
    '#f.........#.........w.#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#.B........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#...1..o...a....R..U.o.#',
    '########################',
  ],
  hardMap: [
    '########################',
    '#f.........#.........w.#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#.B........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#...1..o...a....R..U.o.#',
    '########################',
  ],
  platforms: [],
  hardPlatforms: [],
};

// L3 箱庭枢机：推箱压 1 号板开 a 门（闩锁），火人进右侧密室取火晶+火门（参考「机关大厅」布局重做）
const L3 = {
  name: '箱庭枢机',
  hint: '中央墙隔开左右，a 门默认关。把木箱(B)推到 1 号压力板，a 门永久开启，火人才能进右侧密室取火晶+火门。推箱子(B)+压力板(1)+机关门(a) 进阶版。',
  map: [
    '########################',
    '#f.........#..........w#',
    '#..........#...........#',
    '#...o......#.....o.....#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#.B........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#...1......a.o....R..U.#',
    '########################',
  ],
  hardMap: [
    '########################',
    '#f.........#..........w#',
    '#..........#...........#',
    '#...o......#.....o.....#',
    '#..........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#.B........#...........#',
    '#..........#...........#',
    '#..........#...........#',
    '#...1......a.o....R..U.#',
    '########################',
  ],
  platforms: [],
  hardPlatforms: [],
};

// L4 霜风回廊：冰面打滑 + 风扇气流托升取高处火晶（参考「终局圣堂」竖向结构重做）
const L4 = {
  name: '霜风回廊',
  hint: '地面冰面(_)打滑、提前起跳；走到蓝色风柱(v)上被气流托上柱顶，够到高处火晶。冰面+风扇气流(v) 组合。',
  map: [
    '########################',
    '#f...................w.#',
    '#..........o...........#',
    '#......................#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#R__.......v.._...U.o..#',
    '########################',
  ],
  hardMap: [
    '########################',
    '#f...................w.#',
    '#..........o...........#',
    '#......................#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#..........v...........#',
    '#R__.......v.._...U.o..#',
    '########################',
  ],
  platforms: [],
  hardPlatforms: [],
};

// L5 三重机关：左箱庭(推箱压板开 a) + 右风柱(托升取高处火晶) + 冰面打滑，三位一体协作关
const L5 = {
  name: '三重机关',
  hint: '左箱庭(推箱压板开 a 门)+右风柱(托升取高处火晶)+冰面打滑，三位一体。火人开 a 门后协作：火取高处火晶，水过门取左侧水晶。',
  map: [
    '########################',
    '#f.............#......w#',
    '#..............#.o.....#',
    '#..............#.......#',
    '#..............#.v.....#',
    '#..o...........#.v.....#',
    '#..............#.v.....#',
    '#.B............#.v.....#',
    '#..............#.v.....#',
    '#..............#.v.....#',
    '#R._1..........a_vUo...#',
    '########################',
  ],
  hardMap: [
    '########################',
    '#f.............#......w#',
    '#..............#.o.....#',
    '#..............#.......#',
    '#..............#.v.....#',
    '#..o...........#.v.....#',
    '#..............#.v.....#',
    '#.B............#.v.....#',
    '#..............#.v.....#',
    '#..............#.v.....#',
    '#R._1..........a_vUo...#',
    '########################',
  ],
  platforms: [],
  hardPlatforms: [],
};

/* ============ 可达性校验 ============ */
const W = 24;
function validateLevel(name, def) {
  const problems = [];
  for (const [tag, map] of [['map', def.map], ['hardMap', def.hardMap]]) {
    const rows = map;
    if (rows.length !== 12) problems.push(`[${name}/${tag}] 行数=${rows.length} 应为12`);
    rows.forEach((r, i) => { if (r.length !== W) problems.push(`[${name}/${tag}] 第${i}行长度=${r.length} 应为${W}: "${r}"`); });
    const H = rows.length;
    const tiles = rows.map(r => r.padEnd(W, '#').slice(0, W));
    let f = null, w = null, fE = null, wE = null;
    const crystals = [];
    let ci = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = tiles[y][x];
      if (c === 'f') f = { x, y };
      if (c === 'w') w = { x, y };
      if (c === 'R') fE = { x, y };
      if (c === 'U') wE = { x, y };
      if (c === 'o') { crystals.push({ x, y, kind: ci % 2 === 0 ? 'fire' : 'water' }); ci++; }
    }
    if (!f) problems.push(`[${name}/${tag}] 缺火人出生 f`);
    if (!w) problems.push(`[${name}/${tag}] 缺水妹出生 w`);
    if (!fE) problems.push(`[${name}/${tag}] 缺火门 R`);
    if (!wE) problems.push(`[${name}/${tag}] 缺水门 U`);
    // 门视为已开(a/b可走)；B 变为空地；冰/风可走
    const walk = (c, kind) => {
      if (c === '#' || c === 'x') return false;
      if (kind === 'fire' && c === '~') return false;
      if (kind === 'water' && c === '^') return false;
      return true;
    };
    const bfs = (sx, sy, kind) => {
      const seen = Array.from({ length: H }, () => Array(W).fill(false));
      const q = [{ x: sx, y: sy }]; seen[sy][sx] = true;
      while (q.length) {
        const c = q.shift();
        const here = tiles[c.y][c.x];
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        if (here === 'v') dirs.push([0, -1]); // 风扇：可向上
        for (const [dx, dy] of dirs) {
          const nx = c.x + dx, ny = c.y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          if (seen[ny][nx]) continue;
          if (!walk(tiles[ny][nx], kind)) continue;
          seen[ny][nx] = true; q.push({ x: nx, y: ny });
        }
      }
      return seen;
    };
    const fr = bfs(f.x, f.y, 'fire');
    const wr = bfs(w.x, w.y, 'water');
    crystals.forEach((cr, i) => { if (!((cr.kind === 'fire' ? fr : wr)[cr.y][cr.x])) problems.push(`[${name}/${tag}] 晶体#${i}(${cr.kind}) 不可达`); });
    if (!fr[fE.y][fE.x]) problems.push(`[${name}/${tag}] 火门不可达`);
    if (!wr[wE.y][wE.x]) problems.push(`[${name}/${tag}] 水门不可达`);
  }
  return problems;
}

const p1 = validateLevel('冰霜滑道', L1);
const p2 = validateLevel('箱庭谜题', L2);
const p3 = validateLevel('箱庭枢机', L3);
const p4 = validateLevel('霜风回廊', L4);
const p5 = validateLevel('三重机关', L5);
const allProblems = [...p1, ...p2, ...p3, ...p4, ...p5];
if (allProblems.length) {
  console.log('❌ 新关卡校验未通过：');
  for (const p of allProblems) console.log('  - ' + p);
  process.exit(1);
}
console.log('✅ 新关卡可达性校验通过（门按已开、风扇可上升计算）');

/* ============ 引擎改动（带锚点校验） ============ */
const repls = [];
function add(oldStr, newStr, label) { repls.push({ oldStr, newStr, label }); }

add(
  "      const MAX_FALL = 1400;\n",
  "      const MAX_FALL = 1400;\n      const FAN_FORCE = 3600; // 风扇/气流向上推力（强于重力→上升）\n      const FAN_MAX = 480;    // 气流中上升速度上限\n      const BOX_SIZE = TILE - 12;\n",
  'R1 常量'
);

add(
  "        const plateRects = { a: [], b: [] };\n",
  "        const plateRects = { a: [], b: [] };\n        const boxes = [];\n",
  'R2 buildLevel boxes'
);

add(
  "              default:\n                tiles[y][x] = ch;\n                break;\n            }",
  "              case 'B':\n                boxes.push({ x: x * TILE + 6, y: y * TILE + 6, w: BOX_SIZE, h: BOX_SIZE, vx: 0, vy: 0, dx: 0, dy: 0, onGround: false, _px: null, _py: null });\n                tiles[y][x] = '.';\n                break;\n              default:\n                tiles[y][x] = ch;\n                break;\n            }",
  'R3 buildLevel 解析B'
);

add(
  "          platforms,\n          exits: { fire: fireExit, water: waterExit },",
  "          platforms,\n          boxes,\n          exits: { fire: fireExit, water: waterExit },",
  'R4 state.world boxes'
);

add(
  "        world.platforms.forEach((platform, index) => {\n          solids.push({ x: platform.x, y: platform.y, w: platform.w, h: platform.h, kind: 'platform', index });\n        });\n\n        return solids;",
  "        world.platforms.forEach((platform, index) => {\n          solids.push({ x: platform.x, y: platform.y, w: platform.w, h: platform.h, kind: 'platform', index });\n        });\n\n        (world.boxes || []).forEach((box, index) => {\n          solids.push({ x: box.x, y: box.y, w: box.w, h: box.h, kind: 'box', index });\n        });\n\n        return solids;",
  'R5 gatherSolids 箱子'
);

add(
  "        for (const player of players) {\n          if (!player.alive || player.escaped) continue;\n          const rect = playerRect(player);\n          for (const plate of state.world.plateRects.a) {\n            if (rectOverlap(rect, plate)) switches.a = true;\n          }\n          for (const plate of state.world.plateRects.b) {\n            if (rectOverlap(rect, plate)) switches.b = true;\n          }\n        }\n        state.world.switches = switches;",
  "        for (const player of players) {\n          if (!player.alive || player.escaped) continue;\n          const rect = playerRect(player);\n          for (const plate of state.world.plateRects.a) {\n            if (rectOverlap(rect, plate)) switches.a = true;\n          }\n          for (const plate of state.world.plateRects.b) {\n            if (rectOverlap(rect, plate)) switches.b = true;\n          }\n        }\n        for (const box of (state.world.boxes || [])) {\n          const rect = { x: box.x, y: box.y, w: box.w, h: box.h };\n          for (const plate of state.world.plateRects.a) {\n            if (rectOverlap(rect, plate)) switches.a = true;\n          }\n          for (const plate of state.world.plateRects.b) {\n            if (rectOverlap(rect, plate)) switches.b = true;\n          }\n        }\n        state.world.switches = switches;",
  'R6 updateSwitches 箱子压板'
);

const NEW_FUNCS = `
      // ===== 新增机关：推箱子 / 冰面 / 风扇气流 =====
      function boxHitsWorld(box, nx, ny, ignoreIdx) {
        const world = state.world;
        const rect = { x: nx, y: ny, w: box.w, h: box.h };
        const tx0 = Math.floor(rect.x / TILE), tx1 = Math.floor((rect.x + rect.w - 1) / TILE);
        const ty0 = Math.floor(rect.y / TILE), ty1 = Math.floor((rect.y + rect.h - 1) / TILE);
        for (let ty = ty0; ty <= ty1; ty++) {
          for (let tx = tx0; tx <= tx1; tx++) {
            if (isSolidTile(tileAt(world, tx, ty), world.switches)) return true;
          }
        }
        for (const p of world.platforms) {
          if (rectOverlap(rect, { x: p.x, y: p.y, w: p.w, h: p.h })) return true;
        }
        for (let j = 0; j < world.boxes.length; j++) {
          if (j === ignoreIdx) continue;
          const o = world.boxes[j];
          if (rectOverlap(rect, { x: o.x, y: o.y, w: o.w, h: o.h })) return true;
        }
        return false;
      }

      function moveBoxAxis(box, idx, dx, dy) {
        let blocked = false;
        if (dx !== 0) {
          const steps = Math.max(1, Math.ceil(Math.abs(dx) / 4));
          const sgn = Math.sign(dx);
          for (let s = 0; s < steps; s++) {
            const step = sgn * Math.min(4, Math.abs(dx) - s * 4);
            if (boxHitsWorld(box, box.x + step, box.y, idx)) { blocked = true; break; }
            box.x += step;
          }
        }
        if (dy !== 0) {
          const steps = Math.max(1, Math.ceil(Math.abs(dy) / 4));
          const sgn = Math.sign(dy);
          for (let s = 0; s < steps; s++) {
            const step = sgn * Math.min(4, Math.abs(dy) - s * 4);
            if (boxHitsWorld(box, box.x, box.y + step, idx)) { blocked = true; break; }
            box.y += step;
          }
        }
        return blocked;
      }

      function updateBoxes(dt) {
        const world = state.world;
        if (!world || !world.boxes || !world.boxes.length) return;
        for (let i = 0; i < world.boxes.length; i++) {
          const box = world.boxes[i];
          box.vy = Math.min(box.vy + GRAVITY * getDiffMult().gravityMult * dt, MAX_FALL);
          const blocked = moveBoxAxis(box, i, 0, box.vy * dt);
          if (blocked) {
            if (box.vy > 0) box.onGround = true;
            box.vy = 0;
          } else {
            box.onGround = false;
          }
        }
      }

      function carryBoxRiders() {
        const world = state.world;
        if (!world || !world.boxes || !world.boxes.length) return;
        world.boxes.forEach((box, idx) => {
          box.dx = box.x - (box._px == null ? box.x : box._px);
          box.dy = box.y - (box._py == null ? box.y : box._py);
          box._px = box.x; box._py = box.y;
          if (!box.dx && !box.dy) return;
          for (const player of players) {
            if (!player.alive || player.escaped) continue;
            if (player.riding === 1000 + idx) {
              player.x += box.dx;
              player.y += box.dy;
              pushOutOfWalls(player);
            }
          }
        });
      }

      function isOnIce(player) {
        const world = state.world;
        const fy = Math.floor((player.y + player.h + 2) / TILE);
        const fx0 = Math.floor(player.x / TILE), fx1 = Math.floor((player.x + player.w - 1) / TILE);
        for (let fx = fx0; fx <= fx1; fx++) {
          if (tileAt(world, fx, fy) === '_') return true;
        }
        return false;
      }

      function onUpdraft(player) {
        const world = state.world;
        const tx0 = Math.floor(player.x / TILE), tx1 = Math.floor((player.x + player.w - 1) / TILE);
        const ty0 = Math.floor(player.y / TILE), ty1 = Math.floor((player.y + player.h - 1) / TILE);
        for (let ty = ty0; ty <= ty1; ty++) {
          for (let tx = tx0; tx <= tx1; tx++) {
            if (tileAt(world, tx, ty) === 'v') return true;
          }
        }
        return false;
      }

      function tryPushBoxes(player, dt) {
        const world = state.world;
        if (!world || !world.boxes || !world.boxes.length) return;
        if (!player.onGround) return;
        const dir = inputDown(player, 'right') ? 1 : inputDown(player, 'left') ? -1 : 0;
        if (!dir) return;
        const move = Math.max(60, Math.abs(player.vx)) * dt;
        for (let i = 0; i < world.boxes.length; i++) {
          const box = world.boxes[i];
          const vOverlap = player.y < box.y + box.h - 2 && player.y + player.h > box.y + 2;
          if (!vOverlap) continue;
          if (dir > 0 && Math.abs((player.x + player.w) - box.x) <= 5) {
            if (!boxHitsWorld(box, box.x + move, box.y, i)) {
              box.x += move; player.x = box.x - player.w; player.vx *= 0.4;
            }
            return;
          }
          if (dir < 0 && Math.abs(player.x - (box.x + box.w)) <= 5) {
            if (!boxHitsWorld(box, box.x - move, box.y, i)) {
              box.x -= move; player.x = box.x + box.w; player.vx *= 0.4;
            }
            return;
          }
        }
      }
`;
add(
  "      function canPlacePlayer(player, x, y) {",
  NEW_FUNCS + "\n      function canPlacePlayer(player, x, y) {",
  'R7 新机关函数'
);

add(
  "        } else {\n          player.vx *= Math.pow(FRICTION, dt * 60);\n          if (Math.abs(player.vx) < 8) player.vx = 0;\n        }",
  "        } else {\n          const fric = isOnIce(player) ? 0.985 : FRICTION;\n          player.vx *= Math.pow(fric, dt * 60);\n          if (Math.abs(player.vx) < 8) player.vx = 0;\n        }",
  'R8 冰面摩擦'
);

add(
  "        player.vy = Math.min(player.vy + GRAVITY * getDiffMult().gravityMult * dt, MAX_FALL);\n",
  "        player.vy = Math.min(player.vy + GRAVITY * getDiffMult().gravityMult * dt, MAX_FALL);\n        if (onUpdraft(player)) {\n          player.vy -= FAN_FORCE * dt;\n          if (player.vy < -FAN_MAX) player.vy = -FAN_MAX;\n        }\n",
  'R9 风扇上升'
);

add(
  "          if (player.vy > 0) {\n            nextY = solid.y - player.h;\n            player.onGround = true;\n            if (solid.kind === 'platform') player.riding = solid.index;\n          } else {",
  "          if (player.vy > 0) {\n            nextY = solid.y - player.h;\n            player.onGround = true;\n            if (solid.kind === 'platform') player.riding = solid.index;\n            else if (solid.kind === 'box') player.riding = 1000 + solid.index;\n          } else {",
  'R10 站箱判定'
);

add(
  "        player.y = nextY;\n\n        if (player.onGround) {",
  "        player.y = nextY;\n\n        tryPushBoxes(player, dt);\n\n        if (player.onGround) {",
  'R11 推箱调用'
);

add(
  "        updatePlatforms(dt);\n        carryRiders();\n        updateSwitches();",
  "        updatePlatforms(dt);\n        carryRiders();\n        if (state.world) updateBoxes(dt);\n        updateSwitches();",
  'R12a updateBoxes'
);

add(
  "        for (const player of players) {\n          movePlayer(player, dt);\n        }\n        resolvePlayerCollisions();",
  "        for (const player of players) {\n          movePlayer(player, dt);\n        }\n        if (state.world) carryBoxRiders();\n        resolvePlayerCollisions();",
  'R12b carryBoxRiders'
);

add(
  "            } else if (ch === '*') {\n              drawSpring(px, py, time);\n            } else if (ch === '.') {\n              if (y > 0 && world.tiles[y - 1][x] === '#') {\n                drawMoss(px, py);\n              }\n            }",
  "            } else if (ch === '*') {\n              drawSpring(px, py, time);\n            } else if (ch === '_') {\n              drawIce(px, py);\n            } else if (ch === 'v') {\n              drawFan(px, py, time);\n            } else if (ch === '.') {\n              if (y > 0 && world.tiles[y - 1][x] === '#') {\n                drawMoss(px, py);\n              }\n            }",
  'R13 画冰/风'
);

add(
  "        for (const platform of world.platforms) {\n          drawPlatform(platform.x, platform.y, platform.w, platform.h);\n        }\n\n        for (const crystal of world.crystals) {",
  "        for (const platform of world.platforms) {\n          drawPlatform(platform.x, platform.y, platform.w, platform.h);\n        }\n\n        for (const box of (world.boxes || [])) {\n          drawCrate(box.x, box.y, box.w, box.h);\n        }\n\n        for (const crystal of world.crystals) {",
  'R14 画箱子'
);

const DRAW_HELPERS = `
      function drawIce(x, y) {
        ctx.save();
        const grad = ctx.createLinearGradient(x, y, x, y + TILE);
        grad.addColorStop(0, 'rgba(200,240,255,0.55)');
        grad.addColorStop(1, 'rgba(150,210,255,0.28)');
        ctx.fillStyle = grad;
        roundRect(x + 1, y + 1, TILE - 2, TILE - 2, 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 10); ctx.lineTo(x + 20, y + 6);
        ctx.moveTo(x + 26, y + 16); ctx.lineTo(x + 38, y + 12);
        ctx.stroke();
        ctx.restore();
      }

      function drawFan(x, y, time) {
        ctx.save();
        const grad = ctx.createLinearGradient(x, y, x, y + TILE);
        grad.addColorStop(0, 'rgba(150,230,255,0.35)');
        grad.addColorStop(1, 'rgba(120,200,255,0.08)');
        ctx.fillStyle = grad;
        ctx.fillRect(x + 10, y, TILE - 20, TILE);
        ctx.fillStyle = 'rgba(220,245,255,0.85)';
        const off = (time * 0.06) % 16;
        for (let i = 0; i < 2; i++) {
          const ay = y + TILE - ((off + i * 8) % TILE);
          ctx.beginPath();
          ctx.moveTo(x + TILE / 2, ay - 6);
          ctx.lineTo(x + TILE / 2 - 5, ay + 2);
          ctx.lineTo(x + TILE / 2 + 5, ay + 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = '#3a5a6b';
        roundRect(x + 6, y + TILE - 12, TILE - 12, 10, 4);
        ctx.fill();
        ctx.restore();
      }

      function drawCrate(x, y, w, h) {
        ctx.save();
        const grad = ctx.createLinearGradient(x, y, x, y + h);
        grad.addColorStop(0, '#c79b5e');
        grad.addColorStop(1, '#8a6328');
        ctx.fillStyle = grad;
        roundRect(x, y, w, h, 6);
        ctx.fill();
        ctx.strokeStyle = 'rgba(60,40,15,0.7)';
        ctx.lineWidth = 2;
        roundRect(x + 2, y + 2, w - 4, h - 4, 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 4, y + 4); ctx.lineTo(x + w - 4, y + h - 4);
        ctx.moveTo(x + w - 4, y + 4); ctx.lineTo(x + 4, y + h - 4);
        ctx.stroke();
        ctx.restore();
      }
`;
add(
  "      function drawCharacter(player, time) {",
  DRAW_HELPERS + "\n      function drawCharacter(player, time) {",
  'R15 画机关辅助'
);

// 关卡注入
const arr = JSON.stringify([L1, L2, L3, L4, L5], null, 2);
const body = arr.slice(arr.indexOf('[') + 1, arr.lastIndexOf(']'));
const insert = ',\n' + body + '\n];';
add(
  "];\n\n      const state = {",
  insert + "\n\n      const state = {",
  'R16 注入新关卡'
);

/* ============ 执行（校验锚点唯一性后写入） ============ */
let out = html;
for (const r of repls) {
  const n = out.split(r.oldStr).length - 1;
  if (n !== 1) {
    console.log(`❌ 锚点不匹配 [${r.label}]：出现 ${n} 次（必须恰好 1 次）`);
    process.exit(2);
  }
}
for (const r of repls) {
  out = out.replace(r.oldStr, r.newStr);
}
writeFileSync(FILE, out.replace(/\n/g, '\r\n'), 'utf8');
console.log(`✅ 已注入 ${repls.length} 处改动并写入 ${FILE}`);
console.log('   新增机关：推箱子(B) / 冰面(_) / 风扇气流(v)；新增关卡：冰霜滑道、箱庭谜题');
