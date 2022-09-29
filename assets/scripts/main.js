// Clock
function setCurrentDate() {
  const clockDate = document.querySelector('.js-clock__date');

  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const today = new Date().toLocaleDateString('pt-br', dateOptions);

  clockDate.textContent = today;
}

setCurrentDate();

function setCurrentHour() {
  const clockHour = document.querySelector('.js-clock__hour');

  const now = new Date();
  const hour = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '00');

  clockHour.textContent = hour;
}

function updateClock() {
  setCurrentHour();

  setInterval(setCurrentHour, 1000 * 60);
}

updateClock();