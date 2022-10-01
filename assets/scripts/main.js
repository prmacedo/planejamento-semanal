import { Clock } from "./Clock.js";
import { DOM } from "./DOM.js";
import { Activity } from "./Activity.js";

new Clock();
const objDOM = new DOM();

// Board
const weekdayList = document.querySelectorAll('.js-weekday__item');
weekdayList.forEach(weekdayItem => {
  weekdayItem.addEventListener('click', selectDay);
});

initialActivitiesList();

const deleteAllButton = document.querySelector('.js-deleteAll');
deleteAllButton.addEventListener('click', deleteAllActivitiesOfTheDay);

function deleteAllActivitiesOfTheDay() {
  const weekdayActive = document.querySelector('.weekday__item--active');
  const day = weekdayActive.getAttribute('data-day');

  Activity.deleteActivitiesByDay(day);

  listActivities(day);
}

function initialActivitiesList() {
  const currentWeekDay = new Date().getDay();

  const weekdayItem = document.querySelector(`.weekday__item[data-day="${currentWeekDay}"]`);
  weekdayItem.classList.add('weekday__item--active');

  listActivities(currentWeekDay);
}

function selectDay(evt) {
  removeWeekdayActive();

  const weekdayItem = evt.target;
  const day = weekdayItem.getAttribute('data-day');

  weekdayItem.classList.add('weekday__item--active');
  listActivities(day);
}

function removeWeekdayActive() {
  const weekdayItem = document.querySelector('.weekday__item--active');
  weekdayItem.classList.remove('weekday__item--active');
}

function listActivities(day) {
  objDOM.clearBoard();

  const modificator = getDayModificator(day);
  const activities = Activity.getActivitiesByDay(day);

  activities.forEach(activity => {
    objDOM.createBoardItem(activity, modificator)
  });
}

function getDayModificator(index) {
  const weekdays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
  return weekdays[index];
}