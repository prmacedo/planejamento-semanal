import { Clock } from "./Clock.js";
import { DOM } from "./DOM.js";

new Clock();
const objDOM = new DOM();

// Board
const activityList = [
  [
    {
      id: 3,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      time: '08h30m'
    },
    {
      id: 4,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '11h30m'
    },
    {
      id: 1,
      description: 'Descanso',
      time: '12h30m'
    },
    {
      id: 16,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      time: '14h00m'
    },
    {
      id: 17,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '16h30m'
    },
    {
      id: 15,
      description: 'Descanso',
      time: '19h30m'
    }
  ],  // Domingo
  [
    {
      id: 6,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '08h30m'
    },
  ], // Segunda
  [
    {
      id: 7,
      description: 'Descanso',
      time: '10h30m'
    },
    {
      id: 8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '11h30m'
    },
    {
      id: 9,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      time: '18h30m'
    },
  ], // Terça
  [
    {
      id: 11,
      description: 'Descanso',
      time: '10h30m'
    }
  ], // Quarta
  [
    {
      id: 2,
      description: 'Descanso',
      time: '10h30m'
    },
    {
      id: 5,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      time: '16h30m'
    }
  ],  // Quinta
  [
    {
      id: 13,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      time: '06h30m'
    },
    {
      id: 14,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ',
      time: '16h30m'
    },
    {
      id: 12,
      description: 'Descanso',
      time: '20h30m'
    }
  ], // Sexta
  [
    {
      id: 12,
      description: 'Descanso',
      time: '20h30m'
    }
  ]  // Sábado
];

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

  activityList[day] = [];

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

function getActivitiesByDay(day) {
  return activityList[day];
}

function listActivities(day) {
  objDOM.clearBoard();

  const modificator = getDayModificator(day);
  const activities = getActivitiesByDay(day);

  console.log(activities);
  activities.forEach(activity => {
    objDOM.createBoardItem(activity, modificator)
  });
}

function getDayModificator(index) {
  const weekdays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
  return weekdays[index];
}