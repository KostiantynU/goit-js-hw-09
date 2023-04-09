import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  dateTimeEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
  isDisabledStartBtn: (document.querySelector('button[data-start]').disabled = true),
  isDisabledStopBtn: (document.querySelector('button[data-stop]').disabled = true),
  allValues: document.querySelectorAll('.value'),

  countId: null,
  isActiveCycle: false,

  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      beginOfWork(selectedDates[0]);
    },
  },
  timeToCount: null,

  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),

  notiflixObj: {
    timeout: 1000,
    backOverlay: true,
    pauseOnHover: true,
  },

  startAnimateIntervalId: null,
  endAnimateIntervalId: null,
};

refs.startBtnEl.addEventListener('click', startTimer);
refs.stopBtnEl.addEventListener('click', stopTimer);
const myDateTimeEl = flatpickr(refs.dateTimeEl, refs.options);

function getCurrentTime() {
  return (currentDate = new Date());
}

function beginOfWork(dateByUser) {
  const differenceTime = dateByUser.getTime() - getCurrentTime();
  if (differenceTime < 0) {
    Notiflix.Notify.failure('Please choose a date in the future', refs.notiflixObj);
    return;
  }
  Notiflix.Notify.success(`You choose date in future! ${dateByUser}`, refs.notiflixObj);
  refs.timeToCount = dateByUser;
  refs.startBtnEl.disabled = false;
  refs.isActiveCycle = false;
}

function startTimer() {
  if (refs.isActiveCycle) {
    Notiflix.Notify.failure('The timer is running!', refs.notiflixObj);
    return;
  }
  refs.stopBtnEl.disabled = false;
  animateNumber();
  disAnimateNumber();

  refs.countId = setInterval(() => {
    const tempObj = convertMs(refs.timeToCount - getCurrentTime());
    refs.isActiveCycle = true;
    const { days, hours, minutes, seconds } = tempObj;
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      Notiflix.Notify.success('You reached end of timer!', refs.notiflixObj);
      clearInterval(refs.countId);
      clearInterval(refs.startAnimateIntervalId);
      clearInterval(refs.endAnimateIntervalId);
      showResult(0);
      return;
    }

    showResult(tempObj);
  }, 1000);
}

function stopTimer() {
  refs.isActiveCycle = false;
  refs.startBtnEl.disabled = false;
  refs.stopBtnEl.disabled = true;
  refs.allValues.forEach(el => {
    el.classList.remove('active-timer');
  }); // Можна натиснути кнопку стоп тоді, коли текст таймеру вже зелений, і він
  // так і залишиться. Усуваю цей нюанс.
  clearInterval(refs.countId);
  clearInterval(refs.startAnimateIntervalId);
  clearInterval(refs.endAnimateIntervalId);
  // showResult(0);
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

function showResult({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function animateNumber() {
  refs.startBtnEl.disabled = true;
  refs.startAnimateIntervalId = setInterval(() => {
    refs.allValues.forEach(el => {
      el.classList.add('active-timer');
    });
  }, 500);
}

function disAnimateNumber() {
  refs.endAnimateIntervalId = setInterval(() => {
    refs.allValues.forEach(el => {
      el.classList.remove('active-timer');
    });
  }, 1000);
}
