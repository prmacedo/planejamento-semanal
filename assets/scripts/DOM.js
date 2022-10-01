import { Activity } from "./Activity.js";

class DOM {
  #hourList;
  #scheduleList;

  constructor() {
    this.#hourList = document.querySelector('.js-time');
    this.#scheduleList = document.querySelector('.js-schedule');
  }

  listActivities(day) {
    this.clearBoard();

    const activities = Activity.getActivitiesByDay(day);

    activities.forEach(activity => {
      this.createBoardItem(activity, day)
    });
  }

  clearBoard() {
    const timeItem = document.querySelectorAll('.time__item');

    timeItem.forEach(item => {
      item.parentNode.removeChild(item);
    });

    this.#scheduleList.innerHTML = '';
  }

  createBoardItem(activity, day) {
    const modificator = this.#getDayModificator(day);

    const timeItem = this.#createTimeItem(activity, modificator)
    this.#hourList.appendChild(timeItem);

    const scheduleAppointment = this.#createScheduleAppointment();
    const scheduleItem = this.#createScheduleItem(modificator);
    const scheduleText = this.#createScheduleText(activity, modificator);
    const button = this.#createDarkredButton(activity.id, day);

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

  #createDarkredButton(id, day) {
    const button = document.createElement('button');
    button.classList.add('button', 'button--darkred');
    button.textContent = 'Apagar';
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', id);
    button.setAttribute('data-day', day);
    button.addEventListener("click", this.#handleDeleteById);

    return button;
  }

  #handleDeleteById = (evt) => {
    const id = Number(evt.target.getAttribute("data-id"));
    const day = Number(evt.target.getAttribute("data-day"));

    Activity.deleteActivityById(id, day);

    this.listActivities(day);
  }

  #getDayModificator(index) {
    const weekdays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
    return weekdays[index];
  }
}

export { DOM };