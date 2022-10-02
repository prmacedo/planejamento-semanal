class Clock {
  constructor() {
    this.#setCurrentDate();
    this.#startClock();
  }

  #setCurrentDate() {
    const clockDate = document.querySelector('.js-clock__date');

    const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date().toLocaleDateString('pt-br', dateOptions);

    clockDate.textContent = today;
  }

  #updateClock() {
    const clockHour = document.querySelector('.js-clock__hour');

    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '00') + ':' + now.getMinutes().toString().padStart(2, '00');

    clockHour.textContent = hour;
  }

  #startClock() {
    this.#updateClock();

    setInterval(this.#updateClock, 1000 * 60);
  }
}

export { Clock };