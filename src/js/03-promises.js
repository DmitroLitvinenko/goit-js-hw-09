import { Notify } from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  let currentDelay = parseInt(delay.value);
  for (let i = 1; i <= parseInt(amount.value); i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += parseInt(step.value);
  }
  event.target.reset();
});
