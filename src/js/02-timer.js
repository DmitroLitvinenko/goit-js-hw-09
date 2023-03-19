import Notiflix, { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtnRef.removeAttribute('disabled');
    Notify.success('Correct date selected');
    startBtnRef.addEventListener('click', () => startCountdown(selectedDate));
    console.log(selectedDate);
  },
};

const startBtnRef = document.querySelector('button[data-start]');
startBtnRef.setAttribute('disabled', true);
const inputRef = document.querySelector('input[type="text"]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

flatpickr(inputRef, options);

function startCountdown(endDate) {
  startBtnRef.removeAttribute('disabled');

  const intervalId = setInterval(() => {
    const ms = endDate - new Date();
    if (ms <= 0) {
      clearInterval(intervalId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
