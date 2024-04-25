import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const formBtn = document.querySelector('button');

let position = 0;

const {
  elements: { delay, step, amount },
} = form;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      console.log(random);
      const shouldResolve = random > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  formBtn.setAttribute('disabled', '');
  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, Number(delay.value) + Number(step.value) * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        if (i === Number(amount.value) - 1) {
          formBtn.removeAttribute('disabled');
        }
      });
  }
}

form.addEventListener('submit', handleSubmit);
