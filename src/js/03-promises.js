import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const data = {};

    new FormData(formEl).forEach((value, name) => (data[name] = value));

    let delayCounter = Number(data.delay);

    if (Number(data.amount) <= 0 || Number(data.step) < 0 || Number(data.delay) < 0) {
        Notify.failure(`❌ Invalid range entered`);
    } else {
        for (let i = 1; i <= Number(data.amount); i += 1) {
            createPromise(i, delayCounter)
                .then(({ position, delay }) => {
                    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
                })
                .catch(({ position, delay }) => {
                    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
                });

            delayCounter += Number(data.step);
        }
    }
}

console.dir(formEl);

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) =>
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay)
    );
}