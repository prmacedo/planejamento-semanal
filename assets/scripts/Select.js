class Select {
  #weekday;

  constructor() {
    this.#weekday = {
      select: document.querySelector('.js-weekdaySelect'),
      input: document.querySelector('.js-formWeekday'),
      text: document.querySelector('.js-weekdaySelect .js-selectText'),
      options: document.querySelectorAll('.js-weekdaySelect .js-selectItem')
    }

    this.#addClickEvent();
  }

  #addClickEvent() {
    this.#weekday.select.addEventListener("click", this.#handleWeekdaySelectFieldClick);
    this.#weekday.options.forEach(weekdayItem => {
      weekdayItem.addEventListener("click", this.#handleWeekdaySelectValue);
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

    console.log(value, label);
  }
}

export { Select };