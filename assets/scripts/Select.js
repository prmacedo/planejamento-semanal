class Select {
  #weekday;
  #time;

  constructor() {
    this.#weekday = {
      select: document.querySelector('.js-weekdaySelect'),
      input: document.querySelector('.js-formWeekday'),
      text: document.querySelector('.js-weekdaySelect .js-selectText'),
      options: document.querySelectorAll('.js-weekdaySelect .js-selectItem')
    }

    this.#time = {
      select: document.querySelector('.js-timeSelect'),
      input: document.querySelector('.js-formTime'),
      hours: document.querySelector('.js-timeSelect .js-selectText'),
      minutes: document.querySelector('.js-timeSelect .js-selectInput'),
      options: document.querySelectorAll('.js-timeSelect .js-selectItem')
    }

    this.#addClickEvent();
  }

  #addClickEvent() {
    this.#weekday.select.addEventListener("click", this.#handleWeekdaySelectFieldClick);
    this.#weekday.options.forEach(weekdayItem => {
      weekdayItem.addEventListener("click", this.#handleWeekdaySelectValue);
    });

    this.#time.select.addEventListener("click", this.#handleTimeSelectFieldClick);
    this.#time.options.forEach(timeItem => {
      timeItem.addEventListener("click", this.#handleTimeSelectValue);
    });
  }

  #handleWeekdaySelectFieldClick() {
    const options = document.querySelector('.js-weekdaySelect .js-selectOption');
    options.classList.toggle('select__options--hidden');
  }

  #handleWeekdaySelectValue = (evt) => {
    const value = evt.target.getAttribute('data-day');
    const label = evt.target.textContent;

    this.#weekday.input.value = value;
    this.#weekday.text.textContent = label;
  }

  #handleTimeSelectFieldClick() {
    const options = document.querySelector('.js-timeSelect .js-selectOption');
    options.classList.toggle('select__options--hidden');
  }

  #handleTimeSelectValue = (evt) => {
    const label = evt.target.textContent;

    this.#time.hours.textContent = label;
    this.#time.input.value = label + "00m"

    this.#time.minutes.addEventListener("keyup", this.#maskMinutes);
    this.#time.minutes.setSelectionRange(2,2);
    this.#time.minutes.focus();
  }

  #maskMinutes = (evt) => {
    const onlyNumbers = evt.target.value.replace(/\D/g, "");

    const previousMinutes = onlyNumbers.slice(0, 2);
    const currentMinutes = onlyNumbers.slice(1, 3);

    this.#time.minutes.value = onlyNumbers;

    if (onlyNumbers.length > 2) {
      if ((currentMinutes >= 0) && (currentMinutes < 60)) {
        this.#time.minutes.value = currentMinutes;
      } else {
        this.#time.minutes.value = previousMinutes;
      }
    }

    const hours = this.#time.hours.textContent;
    const minutes = this.#time.minutes.value + 'm';

    this.#time.input.value = hours + minutes;
  }
}

export { Select };