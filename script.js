let startTime, intervalId;
let elapsedTime = 0;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  return date.toISOString().substr(11, 12); // HH:mm:ss.sss
}

function updateDisplay() {
  const now = Date.now();
  const timePassed = now - startTime + elapsedTime;
  display.textContent = formatTime(timePassed);
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now();
    intervalId = setInterval(updateDisplay, 50);
    startStopBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(intervalId);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  display.textContent = '00:00:00.000';
  startStopBtn.textContent = 'Start';
  laps.innerHTML = '';
  running = false;
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const now = Date.now();
    const timePassed = now - startTime + elapsedTime;
    const li = document.createElement('li');
    li.textContent = formatTime(timePassed);
    laps.appendChild(li);
  }
});
