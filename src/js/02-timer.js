import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const daysText = document.querySelector('span[data-days]');
const hoursText = document.querySelector('span[data-hours]');
const minutesText = document.querySelector('span[data-minutes]');
const secondsText = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate.getTime() <= now.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      startButton.dataset.start = selectedDate;
    }
  },
};

flatpickr('input#dateTime-picker', options);

startButton.addEventListener('click', ev => {
  const { start } = ev.currentTarget.dataset;
  let interval = null;
  interval = setInterval(() => {
    const timeNow = new Date();
    const timeThen = new Date(start);
    const timeLeft = timeThen.getTime() - timeNow.getTime();

    const timeLeftObj = convertMs(timeLeft);

    if (timeLeft >= 0) {
      daysText.innerText = `${timeLeftObj.days}`.padStart(2, '0');
      hoursText.innerText = `${timeLeftObj.hours}`.padStart(2, '0');
      minutesText.innerText = `${timeLeftObj.minutes}`.padStart(2, '0');
      secondsText.innerText = `${timeLeftObj.seconds}`.padStart(2, '0');
    }

    if (timeLeft <= 0) cleatInterval(interval);
  }, 1000);
});

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
