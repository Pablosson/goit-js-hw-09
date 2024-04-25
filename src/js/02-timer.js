import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', '');

const counterDays = document.querySelector('span[data-days]');
const counterHours = document.querySelector('span[data-hours]');
const counterMinutes = document.querySelector('span[data-minutes]');
const counterSeconds = document.querySelector('span[data-seconds]');

let currentDateInMs = 0;
let numberOfDays = 0;
let numberOfHours = 0;
let numberOfMinutes = 0;
let numberOfSeconds = 0;
let timerId = null;
let difference = 0;
let selectedDateInMs = 0;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDateInMs = new Date().getTime();
    selectedDateInMs = selectedDates[0].getTime();

    if (selectedDateInMs < currentDateInMs) {
      Notiflix.Notify.failure('Please choose a date in the future');
      clearInterval(timerId);
      render('0');
    } else {
      btnStart.removeAttribute('disabled');
      clearInterval(timerId);
      render('0');
    }
  },
});

function render(string) {
  numberOfDays = addLeadingZero(convertMs(string).days);
  counterDays.textContent = numberOfDays;

  numberOfHours = addLeadingZero(convertMs(string).hours);
  counterHours.textContent = numberOfHours;

  numberOfMinutes = addLeadingZero(convertMs(string).minutes);
  counterMinutes.textContent = numberOfMinutes;

  numberOfSeconds = addLeadingZero(convertMs(string).seconds);
  counterSeconds.textContent = numberOfSeconds;
}

function addLeadingZero(value) {
  let result = value.toString().padStart(2, '0');
  return result;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function startTimer(difference) {
  timerId = setInterval(() => {
    currentDateInMs += 1000;
    difference = selectedDateInMs - currentDateInMs;
    render(difference);

    if (difference <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', '');
  startTimer(difference);
});
