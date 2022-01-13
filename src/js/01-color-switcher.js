const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let colorId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  colorId = setInterval(() => getRandomHexBackgroundColorBody(), 1000);
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function onStopBtnClick() {
  clearInterval(colorId);
  refs.startBtn.removeAttribute('disabled', 'disabled');
}

function getRandomHexBackgroundColorBody() {
  return (refs.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(
    16,
  )}`);
}
