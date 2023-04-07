const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
  timerId: null,
};
refs.startBtnEl.addEventListener('click', startTimer);
refs.stopBtnEl.addEventListener('click', stopTimer);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startTimer() {
  refs.timerId = setInterval(changeBodyColor, 1000);
  refs.startBtnEl.disabled = true;
}

function stopTimer() {
  clearInterval(refs.timerId);
  refs.startBtnEl.disabled = false;
}
function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
