class DOM {
  #hourList;
  #scheduleList;

  constructor() {
    this.#hourList = document.querySelector('.js-time');
    this.#scheduleList = document.querySelector('.js-schedule');
  }

  clearBoard() {
    const timeItem = document.querySelectorAll('.time__item');

    timeItem.forEach(item => {
      item.parentNode.removeChild(item);
    });

    this.#scheduleList.innerHTML = '';
  }

  createBoardItem(activity, modificator) {
    const timeItem = this.#createTimeItem(activity, modificator)
    this.#hourList.appendChild(timeItem);

    const scheduleAppointment = this.#createScheduleAppointment();
    const scheduleItem = this.#createScheduleItem(modificator);
    const scheduleText = this.#createScheduleText(activity, modificator);
    const button = this.#createDarkredButton();

    scheduleItem.appendChild(scheduleText);
    scheduleItem.appendChild(button);
    scheduleAppointment.appendChild(scheduleItem);
    this.#scheduleList.appendChild(scheduleAppointment);
  }

  #createTimeItem(activity, modificator) {
    const timeItemClass = 'time__item--' + modificator;
    const timeItem = document.createElement('li');
    timeItem.classList.add('time__item', timeItemClass);
    timeItem.textContent = activity.time;

    return timeItem;
  }

  #createScheduleItem(modificator) {
    const scheduleItemClass = 'schedule__item--' + modificator;
    const scheduleItem = document.createElement('div');
    scheduleItem.classList.add('schedule__item', scheduleItemClass);

    return scheduleItem;
  }

  #createScheduleText(activity) {
    const scheduleText = document.createElement('p');
    scheduleText.classList.add('schedule__text');
    scheduleText.textContent = activity.description;

    return scheduleText;
  }

  #createScheduleAppointment() {
    const scheduleAppointment = document.createElement('article');
    scheduleAppointment.classList.add('schedule__appointment');

    return scheduleAppointment;
  }

  #createDarkredButton() {
    const button = document.createElement('button');
    button.classList.add('button', 'button--darkred');
    button.textContent = 'Apagar';
    button.setAttribute('type', 'button');

    return button;
  }
}

export { DOM };