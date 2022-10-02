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

    const activities = [...Activity.getActivitiesByDay(day)];

    const activitiesByTime = this.#groupActivitiesByTime(activities);

    this.createBoardItems(activitiesByTime, day);
  }

  clearBoard() {
    const timeItem = document.querySelectorAll('.time__item');

    timeItem.forEach(item => {
      item.parentNode.removeChild(item);
    });

    this.#scheduleList.innerHTML = '';
  }

  createBoardItems(activitiesByTime, day) {
    let timeItem;
    let scheduleAppointment;

    for(const timeGroup in activitiesByTime) {
      const items = activitiesByTime[timeGroup];
      const modificator = (items.length > 1) ? 'conflict': this.#getDayModificator(day);

      items.forEach((activity, index) => {
        if (index === 0) {
          timeItem = this.#createTimeItem(activity, modificator);
          this.#hourList.appendChild(timeItem);

          scheduleAppointment = this.#createScheduleAppointment();
        }

        const scheduleItem = this.#createScheduleItem(modificator);
        const scheduleText = this.#createScheduleText(activity, modificator);
        const button = this.#createDarkredButton(activity.id, day);

        scheduleItem.appendChild(scheduleText);
        scheduleItem.appendChild(button);
        scheduleAppointment.appendChild(scheduleItem);
        this.#scheduleList.appendChild(scheduleAppointment);
      });
    }
  }

  #groupActivitiesByTime(activities) {
    return activities.reduce((group, current) => {
      const time = current.time;

      group[time] = group[time] || [];

      group[time].push(current);
      return group;
    }, {});
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