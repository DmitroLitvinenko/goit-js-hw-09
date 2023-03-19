const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalID;

function startChangingColor() {
  intervalID = setInterval(() => {
    const color = getRandomHexColor();
    refs.body.style.backgroundColor = color;
  }, 1000);
  refs.startBtn.disabled = true;
}

function stopChangingColor() {
  clearInterval(intervalID);
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', startChangingColor);
refs.stopBtn.addEventListener('click', stopChangingColor);
