class Select {
  #weekday;
  #time;

  constructor() {
    this.#weekday = {
      select: document.querySelector('.js-weekdaySelect .js-selectField'),
      input: document.querySelector('.js-formWeekday'),
      text: document.querySelector('.js-weekdaySelect .js-selectText'),
      options: document.querySelectorAll('.js-weekdaySelect .js-selectItem')
    }

    this.#time = {
      select: document.querySelector('.js-timeSelect .js-selectField'),
      input: document.querySelector('.js-formTime'),
      hours: document.querySelector('.js-timeSelect .js-selectText'),
      minutes: document.querySelector('.js-timeSelect .js-selectInput'),
      options: document.querySelectorAll('.js-timeSelect .js-selectItem')
    }

    this.#addClickEvent();
    this.#addChangeEvent();
  }

  #addClickEvent() {
    this.#weekday.select.addEventListener("click", this.#handleClickWeekdaySelect);
    this.#weekday.options.forEach(weekdayItem => {
      weekdayItem.addEventListener("click", this.#setWeekdaySelectValue);
    });

    this.#time.select.addEventListener("click", this.#handleClickTimeSelect);
    this.#time.options.forEach(timeItem => {
      timeItem.addEventListener("click", this.#setTimeSelectValue);
    });
  }

  #addChangeEvent() {
    this.#time.minutes.addEventListener("keyup", this.#maskMinutes)
  }

  #handleClickWeekdaySelect = () => {
    this.#toggleWeekdayOptions();
    this.#removeOptions('.js-timeSelect');
  }

  #toggleWeekdayOptions() {
    const options = document.querySelector('.js-weekdaySelect .js-selectOption');
    options.classList.toggle('select__options--hidden');
  }

  #setWeekdaySelectValue = (evt) => {
    const value = evt.target.getAttribute('data-day');
    const label = evt.target.textContent;

    this.#weekday.input.value = value;
    this.#weekday.text.textContent = label;

    this.#toggleWeekdayOptions();
  }

  #handleClickTimeSelect = () => {
    this.#toggleTimeOptions();
    this.#removeOptions('.js-weekdaySelect');
  }

  #toggleTimeOptions() {
    const options = document.querySelector('.js-timeSelect .js-selectOption');
    options.classList.toggle('select__options--hidden');
  }

  #setTimeSelectValue = (evt) => {
    const label = evt.target.textContent;

    this.#time.hours.textContent = label;
    this.#time.input.value = label + "00m"

    this.#time.minutes.value = "00"
    this.#time.minutes.setSelectionRange(2,2);
    this.#time.minutes.focus();

    this.#toggleTimeOptions();
  }

  #removeOptions(className) {
    document.querySelector(`${className} .js-selectOption`).classList.add('select__options--hidden');
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