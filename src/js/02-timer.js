import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hourValue: document.querySelector('span[data-hours]'),
  minuteValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  timer.start();
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() >= selectedDates[0].getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

const data = flatpickr('input#datetime-picker', options);

const timer = {
  intervalId: null,
  isActiv: false,
  start() {
    if (this.isActiv) {
      return;
    }
    const startTime = data.selectedDates[0];
    this.isActiv = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);
      if (deltaTime < 0) {
        return clearInterval(this.intervalId);
      }

      updateClockface(time);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActiv = false;
  },
};

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${days}`;
  refs.hourValue.textContent = `${hours}`;
  refs.minuteValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
}
