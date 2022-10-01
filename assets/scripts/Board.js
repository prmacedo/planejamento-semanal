import { Activity } from "./Activity.js";
import { DOM } from "./DOM.js";

const objDOM = new DOM();

class Board {
  constructor() {
    this.#initialActivitiesList();
    this.#addDeleteByDayEvent();
    this.#addSelectDayEvent();
  }

  listActivities(day) {
    objDOM.clearBoard();

    const modificator = this.#getDayModificator(day);
    const activities = Activity.getActivitiesByDay(day);

    activities.forEach(activity => {
      objDOM.createBoardItem(activity, modificator)
    });
  }

  #initialActivitiesList() {
    const currentWeekDay = new Date().getDay();

    const weekdayItem = document.querySelector(`.weekday__item[data-day="${currentWeekDay}"]`);
    weekdayItem.classList.add('weekday__item--active');

    this.listActivities(currentWeekDay);
  }

  #addSelectDayEvent() {
    const weekdayList = document.querySelectorAll('.js-weekday__item');
    weekdayList.forEach(weekdayItem => {
      weekdayItem.addEventListener('click', this.#selectDay);
    });
  }

  #addDeleteByDayEvent() {
    const deleteAllButton = document.querySelector('.js-deleteAll');
    deleteAllButton.addEventListener('click', this.#deleteAllActivitiesOfTheDay);
  }

  #deleteAllActivitiesOfTheDay = () => {
    const weekdayActive = document.querySelector('.weekday__item--active');
    const day = weekdayActive.getAttribute('data-day');

    Activity.deleteActivitiesByDay(day);

    this.listActivities(day);
  }

  #selectDay = (evt) => {
    this.#removeWeekdayActive();

    const weekdayItem = evt.target;
    const day = weekdayItem.getAttribute('data-day');

    weekdayItem.classList.add('weekday__item--active');
    this.listActivities(day);
  }

  #removeWeekdayActive() {
    const weekdayItem = document.querySelector('.weekday__item--active');
    weekdayItem.classList.remove('weekday__item--active');
  }

  #getDayModificator(index) {
    const weekdays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
    return weekdays[index];
  }
}

export { Board };