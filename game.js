let selectedCharacter = null;

function enableFullscreen() {
  const docEl = document.documentElement;

  if (docEl.requestFullscreen) {
    docEl.requestFullscreen();
  } else if (docEl.webkitRequestFullscreen) {
    docEl.webkitRequestFullscreen();
  }

  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splash-screen');
  const cactusFill = document.getElementById('splash-cactus-fill');
  const statusElement = document.getElementById('splash-loading-status');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile && fullscreenBtn) {
    fullscreenBtn.classList.remove('hidden');
  }

  const totalDuration = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  const intervalTime = 50;
  let elapsedTime = 0;

  const initialInterval = setInterval(() => {
    elapsedTime += intervalTime + Math.floor(Math.random() * 20);
    const percentage = Math.min(Math.round((elapsedTime / totalDuration) * 100), 100);

    if (cactusFill) cactusFill.style.height = percentage + '%';
    if (statusElement) statusElement.innerText = `Iniciando jogo (${percentage}%)...`;

    if (percentage >= 100) {
      clearInterval(initialInterval);

      if (splashScreen) splashScreen.style.display = 'none';

      document.querySelector('.top-hud').classList.remove('hidden');
      document.getElementById('character-select-screen').classList.remove('hidden');
      document.querySelector('.bottom-hud').classList.remove('hidden');
    }
  }, intervalTime);
});

function chooseCharacter(name, color, imagePath, event) {
  selectedCharacter = { name, color, imagePath };

  const cards = document.querySelectorAll('.card-character');
  cards.forEach(card => card.classList.remove('selected'));

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('selected');
  }

  document.getElementById('hud-character-name').innerText = name.toUpperCase();

  const startBtn = document.getElementById('start-btn');
  startBtn.classList.remove('disabled');
  startBtn.disabled = false;
}

function confirmStart() {
  if (!selectedCharacter) return;

  const loadingHTML = `
    <div id="loading-screen" class="splash-screen" style="z-index: 150;">
      <div class="splash-content">
        <h1 class="splash-title">ENTRANDO NO DESERTO...</h1>
        <p class="splash-subtitle">💡 Mantenha a hidratação e busque os pontos de sombra!</p>
        <div class="cactus-loading-container">
          <div class="cactus-wrapper">
            <span class="cactus-bg">🌵</span>
            <div id="progress-cactus-fill" class="cactus-fill">
              <span class="cactus-fg">🌵</span>
            </div>
          </div>
          <div id="loading-status" class="splash-loading-status">Carregando ecossistema (0%)...</div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', loadingHTML);

  const duration = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  const intervalTime = 50;
  let elapsedTime = 0;

  const progressInterval = setInterval(() => {
    elapsedTime += intervalTime;
    const percentage = Math.min(Math.round((elapsedTime / duration) * 100), 100);

    const fillElement = document.getElementById('progress-cactus-fill');
    const statusElement = document.getElementById('loading-status');

    if (fillElement) fillElement.style.height = percentage + '%';
    if (statusElement) statusElement.innerText = `Carregando ecossistema (${percentage}%)...`;

    if (elapsedTime >= duration) {
      clearInterval(progressInterval);

      document.getElementById('character-select-screen').classList.add('hidden');
      document.querySelector('.top-hud').classList.add('hidden');
      document.querySelector('.bottom-hud').classList.add('hidden');

      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) loadingScreen.remove();

      startPhase1();
    }
  }, intervalTime);
}

function startPhase1() {
  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.classList.remove('hidden');

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#e7a858';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00a8f8';
  ctx.beginPath();
  ctx.arc(480, 320, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#503018';
  ctx.fillRect(430, 180, 100, 50);

  ctx.fillStyle = selectedCharacter.color;
  ctx.fillRect(50, 570, 24, 24);

  ctx.fillStyle = '#000000';
  ctx.font = '12px "Press Start 2P"';
  ctx.fillText('FASE 1: DESERTO', 20, 40);
}