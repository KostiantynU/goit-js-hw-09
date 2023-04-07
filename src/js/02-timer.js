import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  dateTimeEl: document.querySelector('#datetime-picker'),
  startBtnEl: (document.querySelector('button[data-start]').disabled = true),

  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      refs.selectedDate = selectedDates[0];
      beginOfWork(refs.selectedDate);
    },
  },
  selectedDate: null,
};
// i need a function to start. create timeNow, enable button if date is in future.
function beginOfWork(dateByUser) {
  console.dir(dateByUser);
  let currentTime = dateByUser.getTime();
  console.log(currentTime);
  console.log(dateByUser - currentTime);
}
const myDateTimeEl = flatpickr(refs.dateTimeEl, refs.options);
