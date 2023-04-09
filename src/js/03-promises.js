import Notiflix from 'notiflix';
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: null,
  stepEl: null,
  amountEl: null,
};

refs.formEl.addEventListener('input', beginOfWork);
refs.formEl.addEventListener('submit', beforeCratePromise);

function beginOfWork({ target }) {
  if (target.name === 'delay') {
    refs.delayEl = target.value;
  } else if (target.name === 'step') {
    refs.stepEl = target.value;
  } else if (target.name === 'amount') {
    refs.amountEl = target.value;
  }
}
function beforeCratePromise(event) {
  event.preventDefault();
  for (let i = 0; i <= refs.amountEl; i += 1) {
    // console.log(refs.delayEl);
    // console.log(refs.amountEl);
    // console.log(refs.stepEl);
    createPromise(i, refs.delayEl, refs.stepEl);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
