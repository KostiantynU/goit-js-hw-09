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
    refs.delayEl = Number(target.value);
  } else if (target.name === 'step') {
    refs.stepEl = Number(target.value);
  } else if (target.name === 'amount') {
    refs.amountEl = Number(target.value);
  }
}
function beforeCratePromise(event) {
  event.preventDefault();
  for (let i = 1; i <= refs.amountEl; i += 1) {
    createPromise(i, refs.delayEl);
    refs.delayEl += refs.stepEl;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // Fulfill
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // Reject
      }
    }, delay);
  });
  return promise;
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
