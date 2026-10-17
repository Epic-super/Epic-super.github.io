import {
  initHaptic,
  triggerHaptic,
  triggerHapticAccept,
  triggerHapticError,
} from "./haptic.js";

initHaptic();

// --- CONFIGURATION ---
const config = {
  rotationSpeed: 0.01,
  vertexCount: 14,
  cameraDistance: 4.2,
  gameDuration: 60,
  matchesToLevelUp: 5,
  baseShapes: ["Box", "Sphere", "Octahedron", "Dodecahedron", "Icosahedron"],
  nBackValue: 2, // The "N" in N-Back
  nBackTimeout: 4000, // millis
};

const tubeSettings = {
  default: { radius: 0.08 },
  selected: { color: new THREE.Color(0x268bd2), radius: 0.1 },
  incorrect: { color: new THREE.Color(0xdc322f), radius: 0.1 },
};

const solarizedPalette = [
  0x2aa198, // cyan
  0xd33682, // magenta
  0x6c71c4, // violet
  0xb58900, // yellow
  0x859900, // green
  0xcb4b16, // orange
  0x268bd2, // blue
].map((c) => new THREE.Color(c));

// --- GAME STATE VARIABLES ---
let scenes = [],
  cameras = [],
  renderers = [],
  figures = [];
let selections = [];
let isRoundOver = false;
let timerId,
  timeLeft,
  score,
  isPaused,
  isGameStarted = false;
let level, matchesThisLevel;
let currentGameMode = "pair"; // 'pair' or 'n-back'
let nextUniqueId = 0; // *** FIX: Unique ID for each visual configuration

let nBackHistory = [];
let currentNBackData;
let isNBackSeeding = false;
let responseTimeoutId; // For the per-choice timer

// --- DOM ELEMENTS ---
const introScreen = document.getElementById("intro-screen");
const endScreen = document.getElementById("end-screen");
const gameUi = document.getElementById("game-ui");
const pauseOverlay = document.getElementById("pause-overlay");
// Game mode containers
const pairMatchingContainer = document.getElementById("pair-matching-game");
const nBackContainer = document.getElementById("n-back-game");
// Specific game elements
const grid = document.getElementById("figures-grid");
const nBackFigureContainer = document.getElementById("n-back-figure");
const nBackControls = document.getElementById("n-back-controls");
const nBackSeedingOverlay = document.getElementById("n-back-seeding-overlay");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score-display");
const levelDisplay = document.getElementById("level-display");
const finalScoreDisplay = document.getElementById("final-score");
const startPairGameBtn = document.getElementById("start-pair-game-btn");
const startNBackGameBtn = document.getElementById("start-nback-game-btn");
const matchBtn = document.getElementById("match-btn");
const noMatchBtn = document.getElementById("no-match-btn");
const nLevelInput = document.getElementById("n-level-input");
const responseTimerBar = document.getElementById("response-timer-bar");

// --- INITIALIZATION ---

startPairGameBtn.addEventListener("click", () => startGame("pair"));
startNBackGameBtn.addEventListener("click", () => startGame("n-back"));
endScreen.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
});
timerDisplay.addEventListener("click", togglePause);
pauseOverlay.addEventListener("click", togglePause);
matchBtn.addEventListener("click", () => handleNBackChoice(true));
noMatchBtn.addEventListener("click", () => handleNBackChoice(false));
nLevelInput.addEventListener("input", () => {
  let n = parseInt(nLevelInput.value);
  if (isNaN(n) || n < 1) n = 1;
  if (n > 9) n = 9; // Cap the max level
  nLevelInput.value = n;
  startNBackGameBtn.textContent = `${n}-Back Mode`;
});
function startGame(mode) {
  cancelAnimationFrame(animationFrameId);
  triggerHaptic();
  currentGameMode = mode;
  isGameStarted = true;
  isPaused = false;
  score = 0;
  level = 1;
  matchesThisLevel = 0;
  nextUniqueId = 0; // Reset ID counter
  config.vertexCount = 14;
  timeLeft = config.gameDuration;

  introScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  pauseOverlay.classList.add("hidden");
  gameUi.classList.remove("hidden");

  updateScoreDisplay();
  updateLevelDisplay();

  if (currentGameMode === "pair") {
    timeLeft = 2 * config.gameDuration
    startTimer();
    nBackContainer.classList.add("hidden");
    pairMatchingContainer.classList.remove("hidden");
    setupPairMatchingRound();
  } else {
    config.vertexCount = config.vertexCount - 6
    config.nBackValue = parseInt(nLevelInput.value);
    pairMatchingContainer.classList.add("hidden");
    nBackContainer.classList.remove("hidden");
    nBackHistory = [];
    isNBackSeeding = true;
    nBackControls.classList.add("hidden");
    nBackSeedingOverlay.classList.remove("hidden");
    responseTimerBar.classList.remove("hidden");
    responseTimerBar.style.transition = "none";
    responseTimerBar.style.transform = "scaleX(1)";
    void responseTimerBar.offsetWidth;
    responseTimerBar.style.transition = `transform ${config.nBackTimeout / 1000}s linear`;
    responseTimerBar.style.transform = "scaleX(0)";
    presentNextNBackFigure();
  }
  animate();
}

function setupPairMatchingRound() {
  clearGrid();
  isRoundOver = false;

  const numLines = config.vertexCount / 2;
  const paletteSize = solarizedPalette.length;
  const roundColors = [];
  for (let i = 0; i < numLines; i++) {
    roundColors.push(solarizedPalette[i % paletteSize]);
  }

  // *** FIX: Generate unique visual configurations first
  const figureData = config.baseShapes.map((shapeName) => {
    const baseGeometry = createBaseGeometry(shapeName);
    const vertices = samplePointsOnSurface(baseGeometry, config.vertexCount);
    const colors = shuffleArray([...roundColors]);
    baseGeometry.dispose();
    // *** FIX: Assign a unique ID to this specific visual pattern
    return { shapeName, vertices, colors, uniqueId: nextUniqueId++ };
  });

  const shapeToDuplicate =
    figureData[Math.floor(Math.random() * figureData.length)];

  const roundFigures = shuffleArray([
    ...figureData,
    {
      ...shapeToDuplicate, // The duplicate shares the same vertices, colors, and uniqueId
    },
  ]).map((data) => ({
    ...data,
    initialRotation: new THREE.Euler(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
    ),
  }));

  for (let i = 0; i < 6; i++) {
    const data = roundFigures[i];
    const container = document.createElement("div");
    container.classList.add("figure-container");
    // *** FIX: Store the uniqueId, not the base shape name, for matching
    container.dataset.uniqueId = data.uniqueId;
    container.dataset.id = i;
    grid.appendChild(container);
    initThreeScene(
      container,
      i,
      data.vertices,
      data.colors,
      data.initialRotation,
    );
    container.addEventListener("click", handlePairFigureClick);
  }
  requestAnimationFrame(() => {
    grid
      .querySelectorAll(".figure-container")
      .forEach((c) => c.classList.add("visible"));
  });
}

function handlePairFigureClick(event) {
  triggerHaptic();
  if (isRoundOver || isPaused || selections.length >= 2) return;
  const container = event.currentTarget;
  const id = parseInt(container.dataset.id);
  if (selections.some((sel) => sel.id === id)) return;

  updateFigureLook(figures[id], tubeSettings.selected);
  // *** FIX: Push the uniqueId for matching
  selections.push({ uniqueId: container.dataset.uniqueId, id: id });
  if (selections.length === 2) {
    checkPairMatch();
  }
}

function checkPairMatch() {
  isRoundOver = true;
  const [first, second] = selections;
  // *** FIX: The core logic change - compare unique visual IDs, not base shapes
  const isMatch = first.uniqueId === second.uniqueId;

  if (isMatch) {
    triggerHapticAccept();
    score++;
    matchesThisLevel++;
    updateScoreDisplay();

    const firstContainer = grid.children[first.id];
    const secondContainer = grid.children[second.id];

    firstContainer.classList.add("correct-match");
    secondContainer.classList.add("correct-match");

    setTimeout(() => {
      if (matchesThisLevel >= config.matchesToLevelUp) {
        level++;
        matchesThisLevel = 0;
        config.vertexCount += 2;
        timeLeft = timeLeft + config.gameDuration
        updateLevelDisplay();
      }

      const allContainers = grid.querySelectorAll(".figure-container");
      const setupNext = () => {
        allContainers[0].removeEventListener("transitionend", setupNext);
        setupPairMatchingRound();
      };
      allContainers[0].addEventListener("transitionend", setupNext, {
        once: true,
      });
      allContainers.forEach((container) =>
        container.classList.remove("visible"),
      );
    }, 500);
  } else {
    triggerHapticError();
    const [s1, s2] = selections;
    const firstFig = figures[s1.id],
      secondFig = figures[s2.id];
    const firstCont = grid.children[s1.id],
      secondCont = grid.children[s2.id];
    programmaticShake(firstCont);
    programmaticShake(secondCont);
    updateFigureLook(firstFig, tubeSettings.incorrect);
    updateFigureLook(secondFig, tubeSettings.incorrect);
    setTimeout(() => {
      if (firstFig) updateFigureLook(firstFig, tubeSettings.default, true);
      if (secondFig) updateFigureLook(secondFig, tubeSettings.default, true);
      selections = [];
      isRoundOver = false;
    }, 500);
  }
}

// ==========================================
// --- N-BACK MODE LOGIC ---
// ==========================================

function presentNextNBackFigure() {
  clearTimeout(responseTimeoutId);
  clearGrid(true);
  isRoundOver = false;

  if (isNBackSeeding && nBackHistory.length >= config.nBackValue) {
    isNBackSeeding = false;
    nBackSeedingOverlay.classList.add("hidden");
    nBackControls.classList.remove("hidden");
    startTimer();
  }

  const shouldBeMatch = !isNBackSeeding && Math.random() < 0.4;
  let figureData;

  if (shouldBeMatch) {
    // *** FIX: Retrieve the exact visual data from N steps back to create a true visual match
    figureData = nBackHistory[nBackHistory.length - config.nBackValue];
  } else {
    // *** FIX: Generate a completely new, unique visual configuration
    const nBackTarget = isNBackSeeding
      ? null
      : nBackHistory[nBackHistory.length - config.nBackValue];
    const possibleShapes = config.baseShapes.filter(
      (s) => !nBackTarget || s !== nBackTarget.shapeName,
    );
    const shapeToDisplay =
      possibleShapes[Math.floor(Math.random() * possibleShapes.length)];

    const baseGeometry = createBaseGeometry(shapeToDisplay);
    const vertices = samplePointsOnSurface(baseGeometry, config.vertexCount);
    const colors = shuffleArray([...solarizedPalette]).slice(
      0,
      config.vertexCount / 2,
    );
    baseGeometry.dispose();
    figureData = {
      shapeName: shapeToDisplay,
      vertices,
      colors,
      uniqueId: nextUniqueId++,
    };
  }

  // Determine if this trial is a match based on the uniqueId
  const isMatch =
    !isNBackSeeding &&
    nBackHistory.length >= config.nBackValue &&
    figureData.uniqueId ===
      nBackHistory[nBackHistory.length - config.nBackValue].uniqueId;

  currentNBackData = {
    uniqueId: figureData.uniqueId,
    isMatch: isMatch,
  };

  initThreeScene(
    nBackFigureContainer,
    0,
    figureData.vertices,
    figureData.colors,
    new THREE.Euler(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
    ),
  );
  requestAnimationFrame(() => nBackFigureContainer.classList.add("visible"));

  // *** FIX: Push the full visual data to history for potential future matches
  nBackHistory.push(figureData);
  if (nBackHistory.length > config.nBackValue + 2) nBackHistory.shift();

  responseTimerBar.classList.remove("hidden");
  responseTimerBar.style.transition = "none";
  responseTimerBar.style.transform = "scaleX(1)";
  void responseTimerBar.offsetWidth;
  responseTimerBar.style.transition = `transform ${config.nBackTimeout / 1000}s linear`;
  responseTimerBar.style.transform = "scaleX(0)";

  if (isNBackSeeding) {
    setTimeout(presentNextNBackFigure, config.nBackTimeout);
  } else {
    responseTimeoutId = setTimeout(() => {
      triggerHapticError();
      programmaticShake(nBackFigureContainer);
      presentNextNBackFigure();
    }, config.nBackTimeout);
  }
}

function handleNBackChoice(userChoseMatch) {
  if (isPaused || isRoundOver || isNBackSeeding) return;

  clearTimeout(responseTimeoutId);
  responseTimerBar.classList.add("hidden");

  isRoundOver = true;
  const correct = userChoseMatch === currentNBackData.isMatch;

  if (correct) {
    triggerHapticAccept();
    score++;
    matchesThisLevel++;
    nBackFigureContainer.classList.add("correct-match");
    setTimeout(() => {
      nBackFigureContainer.classList.remove("correct-match");
    }, 500);
    if (matchesThisLevel >= config.matchesToLevelUp) {
      level++;
      matchesThisLevel = 0;
      config.vertexCount = Math.min(24, config.vertexCount + 2);
      updateLevelDisplay();
    }
  } else {
    triggerHapticError();
    programmaticShake(nBackFigureContainer);
  }

  updateScoreDisplay();

  setTimeout(() => {
    presentNextNBackFigure();
  }, 300);
}


// ================================
// --- SHARED HELPER FUNCTIONS ---
// ================================

function clearGrid(isNBack = false) {
  if (isNBack) {
    nBackFigureContainer.innerHTML = "";
  } else {
    grid.innerHTML = "";
  }
  selections = [];
  scenes.forEach((scene) => {
    while (scene.children.length > 0) {
      const obj = scene.children[0];
      scene.remove(obj);
      if (obj.isMesh || obj.isGroup) {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      }
    }
  });
  renderers.forEach((renderer) => renderer.dispose());
  scenes = [];
  cameras = [];
  renderers = [];
  figures = [];
}

function initThreeScene(container, index, vertices, colors, initialRotation) {
  scenes[index] = new THREE.Scene();
  cameras[index] = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  cameras[index].position.z = config.cameraDistance;

  renderers[index] = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderers[index].setSize(container.clientWidth, container.clientHeight);
  renderers[index].setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderers[index].domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scenes[index].add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scenes[index].add(directionalLight);

  const figureGroup = new THREE.Group();

  for (let i = 0; i < vertices.length; i += 2) {
    const p1 = vertices[i];
    const p2 = vertices[i + 1];
    const color = colors[i / 2];
    const lineGroup = createCapsule(p1, p2, tubeSettings.default.radius, color);
    figureGroup.add(lineGroup);
  }

  figures[index] = figureGroup;
  figures[index].rotation.copy(initialRotation);
  scenes[index].add(figures[index]);
}

function createCapsule(p1, p2, radius, color) {
  const path = new THREE.LineCurve3(p1, p2);
  const tubeGeometry = new THREE.TubeGeometry(path, 1, radius, 8, false);
  const sphereGeometry = new THREE.SphereGeometry(radius, 16, 16);

  const material = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.1,
    roughness: 0.5,
  });

  const tubeMesh = new THREE.Mesh(tubeGeometry, material);
  const sphere1 = new THREE.Mesh(sphereGeometry, material);
  const sphere2 = new THREE.Mesh(sphereGeometry, material);
  sphere1.position.copy(p1);
  sphere2.position.copy(p2);

  const lineGroup = new THREE.Group();
  lineGroup.add(tubeMesh, sphere1, sphere2);
  lineGroup.userData.originalColor = color;
  lineGroup.userData.path = path;
  return lineGroup;
}

function createBaseGeometry(shapeName) {
  switch (shapeName) {
    case "Sphere":
      return new THREE.SphereGeometry(2.4, 32, 32);
    case "Octahedron":
      return new THREE.OctahedronGeometry(2.6, 0);
    case "Dodecahedron":
      return new THREE.DodecahedronGeometry(2.6, 0);
    case "Icosahedron":
      return new THREE.IcosahedronGeometry(2.6, 0);
    case "Box":
    default:
      return new THREE.BoxGeometry(3.3, 3.3, 3.3);
  }
}

function samplePointsOnSurface(geometry, pointCount) {
  const nonIndexedGeom = geometry.toNonIndexed();
  const position = nonIndexedGeom.getAttribute("position");
  const numFaces = position.count / 3;
  const points = [];
  const p1 = new THREE.Vector3(),
    p2 = new THREE.Vector3(),
    p3 = new THREE.Vector3();
  for (let i = 0; i < pointCount; i++) {
    const faceIndex = Math.floor(Math.random() * numFaces);
    p1.fromBufferAttribute(position, faceIndex * 3 + 0);
    p2.fromBufferAttribute(position, faceIndex * 3 + 1);
    p3.fromBufferAttribute(position, faceIndex * 3 + 2);
    let r1 = Math.random(),
      r2 = Math.random();
    if (r1 + r2 > 1) {
      r1 = 1 - r1;
      r2 = 1 - r2;
    }
    const point = new THREE.Vector3()
      .addScaledVector(p1, 1 - r1 - r2)
      .addScaledVector(p2, r1)
      .addScaledVector(p3, r2);
    points.push(point);
  }
  nonIndexedGeom.dispose();
  return points;
}

function updateFigureLook(figureGroup, setting, revertToOriginal = false) {
  figureGroup.children.forEach((lineGroup) => {
    const newRadius = setting.radius;
    const newColor = revertToOriginal
      ? lineGroup.userData.originalColor
      : setting.color;

    lineGroup.children.forEach((mesh) => {
      if (mesh.geometry.type === "TubeGeometry") {
        const newGeo = new THREE.TubeGeometry(
          lineGroup.userData.path,
          1,
          newRadius,
          8,
          false,
        );
        mesh.geometry.dispose();
        mesh.geometry = newGeo;
      } else if (mesh.geometry.type === "SphereGeometry") {
        const newGeo = new THREE.SphereGeometry(newRadius, 16, 16);
        mesh.geometry.dispose();
        mesh.geometry = newGeo;
      }
      mesh.material.color.set(newColor);
    });
  });
}

function programmaticShake(element) {
  element.classList.add("shake");
  setTimeout(() => {
    element.classList.remove("shake");
  }, 400);
}

function startTimer() {
  clearInterval(timerId);
  updateTimerDisplay();
  timerId = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        endGame();
      }
    }
  }, 1000);
}

function togglePause() {
  triggerHaptic();
  if (!isGameStarted || timeLeft <= 0) return;
  isPaused = !isPaused;
  pauseOverlay.classList.toggle("hidden", !isPaused);
}

function endGame() {
  clearInterval(timerId);
  isGameStarted = false;
  gameUi.classList.add("hidden");
  finalScoreDisplay.textContent = score;
  endScreen.classList.remove("hidden");
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

function updateLevelDisplay() {
  levelDisplay.textContent = `L${level}`;
}

let animationFrameId;
function animate() {
  animationFrameId = requestAnimationFrame(animate);
  if (isPaused || !isGameStarted) return;

  for (let i = 0; i < figures.length; i++) {
    if (figures[i] && renderers[i]) {
      figures[i].rotation.x += config.rotationSpeed;
      figures[i].rotation.y += config.rotationSpeed * 1.5;
      renderers[i].render(scenes[i], cameras[i]);
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("resize", () => {
  const gridToResize =
    currentGameMode === "pair" ? grid : nBackFigureContainer.parentElement;
  for (let i = 0; i < gridToResize.children.length; i++) {
    const container = gridToResize.children[i];
    if (container && cameras[i] && renderers[i]) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameras[i].aspect = width / height;
      cameras[i].updateProjectionMatrix();
      renderers[i].setSize(width, height);
    }
  }
});