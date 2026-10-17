// ===== 引入 Three.js =====
import * as THREE from 'three';

// ===== 全域變數 =====
// Three.js 核心物件
let scene, camera, renderer;
let cubeGroup;                     // 積木組合群組

// 旋轉控制變數
let targetRotationY = 0;           // 目標旋轉角度 (繞 Y 軸)

// 滑鼠拖曳控制變數
let isDragging = false;            // 是否正在拖曳
let previousMouseX = 0;            // 上一次滑鼠 X 座標

// 遊戲狀態變數
let currentAnswer = 0;             // 當前題目的正確答案
let score = 0;                     // 分數
let totalQuestions = 0;            // 總題數
let canRotate = false;             // 是否可以旋轉 (答錯後才能旋轉)
let hasShownRotateHint = false;    // 這題是否已顯示過旋轉提示
const MAX_QUESTIONS = 10;          // 總共 10 題

// 音效系統 - 使用本機音檔
const SOUND_URLS = {
    correct: 'sounds/correct.mp3',
    wrong: 'sounds/wrong.mp3',
    victory: 'sounds/victory.mp3'
};

/**
 * 播放音效
 * @param {string} type - 音效類型 ('correct', 'wrong', 'victory')
 */
function playSound(type) {
    try {
        const audio = new Audio(SOUND_URLS[type]);
        audio.volume = 0.5;
        audio.play().catch(() => {
            // 忽略自動播放被阻擋的錯誤
        });
    } catch (e) {
        // 忽略音效播放錯誤
    }
}

/**
 * 播放答對音效
 */
function playCorrectSound() {
    playSound('correct');
}

/**
 * 播放答錯音效
 */
function playWrongSound() {
    playSound('wrong');
}

/**
 * 播放過關音效
 */
function playVictorySound() {
    playSound('victory');
}

// ===== 隨機積木生成系統 =====
/**
 * 生成層狀積木結構
 * 從視覺最遠的角落開始填充，逐層遞減
 * @returns {Array} - 3D 座標陣列 [[x, y, z], ...]
 */
function generateLayeredStructure() {
    const cubes = [];

    // 決定每層的方塊數量
    // 第一層 (y=0): 4~9 個
    const layer1Count = Math.floor(Math.random() * 6) + 4;  // 4~9
    // 第二層 (y=1): 0 ~ 第一層數量
    const layer2Count = Math.floor(Math.random() * (layer1Count + 1));  // 0~layer1Count
    // 第三層 (y=2): 0 ~ 第二層數量
    const layer3Count = layer2Count > 0 ? Math.floor(Math.random() * (layer2Count + 1)) : 0;  // 0~layer2Count

    // 生成每層的位置
    // 視角固定在 315 度，從使用者視角來看：
    // - 最遠的角落（視覺最上方）是 (0, y, 2)（左後方）
    // - 最近的角落（視覺最下方）是 (2, y, 0)（右前方）
    // 從最遠角落開始填充，使用 z-x 計算距離

    // 定義所有可能的底層位置 (3x3 格子)
    const allPositions = [];
    for (let x = 0; x < 3; x++) {
        for (let z = 0; z < 3; z++) {
            // 315度視角下，z-x 越大代表視覺上越遠（越上方）
            // (0,2) -> 2, (1,2) -> 1, (2,2) -> 0
            // (0,1) -> 1, (1,1) -> 0, (2,1) -> -1
            // (0,0) -> 0, (1,0) -> -1, (2,0) -> -2
            const distance = z - x;
            allPositions.push({ x, z, distance });
        }
    }

    // 按距離排序 (從最遠到最近，distance 大的先填)
    allPositions.sort((a, b) => b.distance - a.distance);

    // 生成第一層
    const layer1Positions = allPositions.slice(0, layer1Count);
    layer1Positions.forEach(pos => {
        cubes.push([pos.x, 0, pos.z]);
    });

    // 生成第二層 (只能放在第一層有方塊的位置上)
    if (layer2Count > 0) {
        const layer2Available = [...layer1Positions];
        layer2Available.sort((a, b) => a.distance - b.distance);
        const layer2Positions = layer2Available.slice(0, layer2Count);
        layer2Positions.forEach(pos => {
            cubes.push([pos.x, 1, pos.z]);
        });

        // 生成第三層 (只能放在第二層有方塊的位置上)
        if (layer3Count > 0) {
            const layer3Available = [...layer2Positions];
            layer3Available.sort((a, b) => a.distance - b.distance);
            const layer3Positions = layer3Available.slice(0, layer3Count);
            layer3Positions.forEach(pos => {
                cubes.push([pos.x, 2, pos.z]);
            });
        }
    }

    return cubes;
}

// ===== 初始化函數 =====
/**
 * 初始化 Three.js 場景
 * 建立場景、相機、渲染器並設定基本參數
 */
/**
 * 根據螢幕尺寸計算適當的 viewSize
 * 手機版需要較大的 viewSize 讓方塊不會超出畫面
 */
function getViewSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // 手機直立模式 (aspect < 1) 需要更大的視野
    if (width <= 480 || aspect < 0.7) {
        return 18;  // 手機版：視野更大，方塊看起來更小
    } else if (width <= 768 || aspect < 1) {
        return 14;  // 平板版或直立模式
    }
    return 10;  // 桌面版
}

function init() {
    // 1. 建立場景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // 2. 建立正交相機 (無透視效果)
    // 計算視窗的長寬比和視角大小
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = getViewSize();  // 根據螢幕尺寸調整視野大小

    // 參數: left, right, top, bottom, near, far
    camera = new THREE.OrthographicCamera(
        -viewSize * aspect / 2,  // left
        viewSize * aspect / 2,   // right
        viewSize / 2,            // top
        -viewSize / 2,           // bottom
        0.1,                     // near
        1000                     // far
    );
    // 設定相機位置
    // 相機位置設定為從正前方斜上方觀看,避免看到後方結構
    // X=0(正前方), Y=4(從上方看), Z=6(距離拉遠)
    camera.position.set(0, 4, 6);                // X, Y, Z 位置
    camera.lookAt(0, 0, 0);                      // 相機看向原點

    // 3. 建立 WebGL 渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true                          // 開啟抗鋸齒
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);  // 設定像素比例以獲得更好的畫質

    // 4. 將渲染器的 DOM 元素加入到容器中
    const container = document.querySelector('#canvas-container');
    container.appendChild(renderer.domElement);
}

// ===== 建立積木堆疊函數 =====
/**
 * 根據座標陣列建立積木堆疊結構
 * @param {Array} structure - 座標陣列 [[x, y, z], ...]
 * @returns {THREE.Group} - 包含所有積木的群組
 */
function createCubeStructure(structure) {
    // 建立群組來容納所有小積木
    const group = new THREE.Group();

    // 單個小積木的大小 (無間隙)
    const cubeSize = 1.0;

    // 建立立方體幾何體 (共用以節省記憶體)
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // 為每個座標建立一個小積木
    structure.forEach(([x, y, z]) => {
        // 為每個面建立固定顏色的材質
        // 積木的 6 個面順序: 右(+X), 左(-X), 上(+Y), 下(-Y), 前(+Z), 後(-Z)
        // 使用 MeshBasicMaterial 不受光照影響,確保顏色固定
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0xcccccc }), // 右側 (+X) - 淺灰色
            new THREE.MeshBasicMaterial({ color: 0x666666 }), // 左側 (-X) - 深灰色
            new THREE.MeshBasicMaterial({ color: 0xffffff }), // 上面 (+Y) - 白色
            new THREE.MeshBasicMaterial({ color: 0x999999 }), // 下面 (-Y) - 中灰色
            new THREE.MeshBasicMaterial({ color: 0x999999 }), // 前面 (+Z) - 中灰色
            new THREE.MeshBasicMaterial({ color: 0x999999 })  // 後面 (-Z) - 中灰色
        ];

        // 建立網格
        const cube = new THREE.Mesh(geometry, materials);

        // 添加黑色邊框
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        cube.add(wireframe);

        // 設定位置 (將座標轉換為世界座標)
        cube.position.set(x, y, z);

        // 加入群組
        group.add(cube);
    });

    // 將群組置中 (計算結構的中心點)
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.sub(center);

    return group;
}

/**
 * 生成一個新的積木堆疊題目
 */
function generateNewQuestion() {
    // 移除舊的積木群組
    if (cubeGroup) {
        scene.remove(cubeGroup);
        // 清理記憶體
        cubeGroup.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => mat.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }

    // 生成層狀結構
    const structure = generateLayeredStructure();

    // 建立新的積木群組
    cubeGroup = createCubeStructure(structure);
    scene.add(cubeGroup);

    // 設定正確答案
    currentAnswer = structure.length;

    // 固定角度為 315 度 (從另一側觀看)
    const fixedAngle = 315;
    const fixedRotationY = (fixedAngle * Math.PI) / 180; // 轉換為弧度

    // 設定固定旋轉角度
    targetRotationY = fixedRotationY;
    cubeGroup.rotation.y = fixedRotationY;

    // 重置旋轉狀態 (新題目不能旋轉,答錯後才能)
    canRotate = false;
    hasShownRotateHint = false;

    // 更新題號
    totalQuestions++;
    updateQuestionDisplay();

    console.log(`題目 ${totalQuestions}: 正確答案是 ${currentAnswer} 個積木`);
}

// ===== 建立座標軸輔助線 =====
/**
 * 建立 XYZ 三軸輔助線
 * X 軸: 紅色
 * Y 軸: 綠色
 * Z 軸: 藍色
 */
function createAxisHelpers() {
    // 使用 Three.js 內建的 AxesHelper
    // 參數是軸的長度
    const axesHelper = new THREE.AxesHelper(4);
    scene.add(axesHelper);

    // 也可以加上標籤,讓使用者更清楚看到每個軸
    // 建立文字標籤的函數
    const createLabel = (text, position, color) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;

        context.fillStyle = color;
        context.font = 'Bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 32, 32);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(0.5, 0.5, 0.5);

        return sprite;
    };

    // 在每個軸的末端加上標籤
    const xLabel = createLabel('X', new THREE.Vector3(4.5, 0, 0), '#ff0000');
    const yLabel = createLabel('Y', new THREE.Vector3(0, 4.5, 0), '#00ff00');
    const zLabel = createLabel('Z', new THREE.Vector3(0, 0, 4.5), '#0000ff');

    scene.add(xLabel);
    scene.add(yLabel);
    scene.add(zLabel);
}

// ===== 添加光源函數 =====
/**
 * 添加環境光和方向光到場景
 * 注意: 使用 MeshBasicMaterial 時不需要光源,因為該材質不受光照影響
 * 此函數已停用以確保立方塊顏色完全固定
 */
function addLights() {
    // 已停用光源 - MeshBasicMaterial 不需要光照
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // directionalLight.position.set(8, 8, 5);
    // scene.add(directionalLight);

    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    // directionalLight2.position.set(-5, -5, -3);
    // scene.add(directionalLight2);
}

// ===== 更新分數顯示 =====
/**
 * 更新分數顯示
 */
function updateQuestionDisplay() {
    const scoreDisplay = document.querySelector('#score-display');
    scoreDisplay.textContent = `${score} 分`;
}

// ===== 動畫循環函數 =====
/**
 * 主要動畫循環
 * 渲染場景
 */
function animate() {
    requestAnimationFrame(animate);

    // 渲染場景
    renderer.render(scene, camera);
}

// ===== 滑鼠事件處理 =====
/**
 * 處理滑鼠拖曳以旋轉積木
 * 滑鼠水平移動 → 控制 Y 軸旋轉 (Y 軸垂直向上,像轉動陀螺)
 * 固定 X 和 Z 軸,只允許水平旋轉
 */

// 滑鼠按下事件
document.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
});

// 滑鼠移動事件
document.addEventListener('mousemove', (e) => {
    if (isDragging && cubeGroup && canRotate) {
        // 計算滑鼠水平移動距離
        const deltaX = e.clientX - previousMouseX;

        // 滑鼠水平移動 → Y 軸旋轉 (垂直軸旋轉,像陀螺)
        targetRotationY += deltaX * 0.01;
        cubeGroup.rotation.y = targetRotationY;

        // 將弧度轉換為角度並顯示在 console
        const degrees = ((targetRotationY * 180 / Math.PI) % 360 + 360) % 360;

        // 更新上一次滑鼠位置
        previousMouseX = e.clientX;
    }
});

// 滑鼠放開事件
document.addEventListener('mouseup', () => {
    isDragging = false;
    if (cubeGroup) {
        // 顯示最終角度
        const finalDegrees = ((targetRotationY * 180 / Math.PI) % 360 + 360) % 360;
        console.log(`最終角度: ${finalDegrees.toFixed(1)}°`);
    }
});

// 觸控事件支援 (移動設備)
// 觸控水平滑動 → Y 軸旋轉
document.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMouseX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (isDragging && cubeGroup && canRotate) {
        // 防止頁面滑動
        e.preventDefault();

        // 計算觸控水平移動距離
        const deltaX = e.touches[0].clientX - previousMouseX;
        // 水平滑動控制 Y 軸旋轉
        targetRotationY += deltaX * 0.01;
        cubeGroup.rotation.y = targetRotationY;

        // 將弧度轉換為角度並顯示在 console
        const degrees = ((targetRotationY * 180 / Math.PI) % 360 + 360) % 360;
        console.log(`旋轉角度: ${degrees.toFixed(1)}°`);

        previousMouseX = e.touches[0].clientX;
    }
}, { passive: false });

document.addEventListener('touchend', () => {
    isDragging = false;
    if (cubeGroup) {
        // 顯示最終角度
        const finalDegrees = ((targetRotationY * 180 / Math.PI) % 360 + 360) % 360;
        console.log(`最終角度: ${finalDegrees.toFixed(1)}°`);
    }
});

// ===== 按鈕控制函數 =====
/**
 * 設定控制按鈕的事件監聽器
 * 使用 querySelector 抓取元素
 */
function setupControls() {
    // 提交答案按鈕
    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.addEventListener('click', () => {
        checkAnswer();
    });

    // 答案輸入框按下 Enter 也提交
    const answerInput = document.querySelector('#answer-input');
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    // 重新開始按鈕
    const restartBtn = document.querySelector('#restart-btn');
    restartBtn.addEventListener('click', () => {
        restartGame();
    });
}

/**
 * 檢查使用者答案
 */
function checkAnswer() {
    const answerInput = document.querySelector('#answer-input');
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer) || userAnswer < 1) {
        showDialog(
            '小提醒',
            '要輸入數字喔！',
            null
        );
        return;
    }

    // 檢查答案
    if (userAnswer === currentAnswer) {
        score += 10;  // 答對加 10 分
        updateQuestionDisplay();
        playCorrectSound();  // 播放答對音效

        // 檢查是否已完成所有題目
        if (totalQuestions >= MAX_QUESTIONS) {
            // 顯示過關畫面
            setTimeout(() => {
                showVictoryScreen();
            }, 500);
        } else {
            showDialog(
                '答對了！好棒！',
                `沒錯！是 ${currentAnswer} 個積木！\n你得到 10 分！`,
                () => {
                    // 自動進入下一題
                    generateNewQuestion();
                    answerInput.value = '';
                },
                'happy'
            );
        }
    } else {
        // 答錯時解鎖旋轉功能
        canRotate = true;
        playWrongSound();  // 播放答錯音效

        // 第一次答錯時顯示旋轉提示
        if (!hasShownRotateHint) {
            hasShownRotateHint = true;
            showDialog(
                '再想想看！',
                `你答 ${userAnswer} 個，不太對喔～\n\n小提示：用手指滑動可以轉轉看積木喔！`,
                null,
                'sad'
            );
        } else {
            showDialog(
                '再想想看！',
                `你答 ${userAnswer} 個，不太對喔～再數一次！`,
                null,
                'sad'
            );
        }
    }
}

/**
 * 顯示過關畫面
 */
function showVictoryScreen() {
    playVictorySound();  // 播放過關音效

    const victoryScreen = document.querySelector('#victory-screen');
    const finalScore = document.querySelector('#final-score');

    finalScore.textContent = score;
    victoryScreen.classList.add('show');

    // 顯示過關角色圖片
    showCharacter('character-pass');
}

/**
 * 重新開始遊戲
 */
function restartGame() {
    // 重置遊戲狀態
    score = 0;
    totalQuestions = 0;

    // 隱藏過關畫面
    const victoryScreen = document.querySelector('#victory-screen');
    victoryScreen.classList.remove('show');

    // 隱藏角色圖片
    hideAllCharacters();

    // 更新顯示
    updateQuestionDisplay();

    // 清空答案輸入框
    const answerInput = document.querySelector('#answer-input');
    answerInput.value = '';

    // 生成第一題
    generateNewQuestion();
}

// ===== Dialog 對話框函數 =====
/**
 * 隱藏所有角色圖片
 */
function hideAllCharacters() {
    document.querySelectorAll('.character-image').forEach(img => {
        img.classList.remove('show');
    });
}

/**
 * 顯示指定的角色圖片
 * @param {string} characterId - 角色圖片的 ID (character-happy, character-sad, character-pass)
 */
function showCharacter(characterId) {
    hideAllCharacters();
    const character = document.querySelector(`#${characterId}`);
    if (character) {
        character.classList.add('show');
    }
}

/**
 * 顯示對話框
 * @param {string} title - 對話框標題
 * @param {string} message - 對話框訊息
 * @param {function} onConfirm - 確定按鈕的回調函數
 * @param {string} characterType - 角色類型 ('happy', 'sad', 'pass' 或空字串)
 * @param {boolean} showCancel - 是否顯示取消按鈕 (預設 false)
 */
function showDialog(title, message, onConfirm, characterType = '', showCancel = false) {
    const wrapper = document.querySelector('#dialog-wrapper');
    const dialog = document.querySelector('#confirm-dialog');
    const titleEl = document.querySelector('#dialog-title');
    const messageEl = document.querySelector('#dialog-message');
    const confirmBtn = document.querySelector('#dialog-confirm');
    const cancelBtn = document.querySelector('#dialog-cancel');

    // 設定對話框內容
    titleEl.textContent = title;
    messageEl.textContent = message;

    // 控制取消按鈕的顯示
    cancelBtn.style.display = showCancel ? 'inline-block' : 'none';

    // 顯示對應的角色圖片
    if (characterType) {
        showCharacter(`character-${characterType}`);
    }

    // 關閉對話框的函數
    const closeDialog = () => {
        wrapper.classList.remove('show');
        dialog.close();
        hideAllCharacters();
    };

    // 確定按鈕事件
    confirmBtn.onclick = () => {
        closeDialog();
        if (onConfirm) onConfirm();
    };

    // 取消按鈕事件
    cancelBtn.onclick = () => {
        closeDialog();
    };

    // 顯示對話框
    wrapper.classList.add('show');
    dialog.show();  // 使用 show() 而非 showModal()，因為我們自訂 backdrop
}

// ===== 響應式設計 =====
/**
 * 處理視窗大小調整
 * 更新相機和渲染器以適應新的視窗大小
 */
window.addEventListener('resize', () => {
    // 更新正交相機的視錐體
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = getViewSize();  // 根據螢幕尺寸動態調整

    camera.left = -viewSize * aspect / 2;
    camera.right = viewSize * aspect / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();

    // 更新渲染器大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

// ===== 程式啟動 =====
/**
 * 當 DOM 載入完成後執行
 * 初始化所有功能並開始動畫循環
 */
window.addEventListener('DOMContentLoaded', () => {
    init();              // 初始化場景
    // createAxisHelpers(); // 已停用座標軸輔助線
    addLights();         // 添加光源
    setupControls();     // 設定控制按鈕
    generateNewQuestion(); // 生成第一題
    animate();           // 開始動畫循環

    console.log('數積木遊戲開始囉！');
    console.log('數數看有幾個積木吧！');
});
