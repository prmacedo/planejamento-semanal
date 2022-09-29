// Clock
function setCurrentDate() {
  const clockDate = document.querySelector('.js-clock__date');

  const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const today = new Date().toLocaleDateString('pt-br', dateOptions);

  clockDate.textContent = today;
}

setCurrentDate();

function setCurrentHour() {
  const clockHour = document.querySelector('.js-clock__hour');

  const now = new Date();
  const hour = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '00');

  clockHour.textContent = hour;
}

function updateClock() {
  setCurrentHour();

  setInterval(setCurrentHour, 1000 * 60);
}

updateClock();

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

const hourList = document.querySelector('.js-time');
const scheduleList = document.querySelector('.js-schedule');

const weekdayList = document.querySelectorAll('.js-weekday__item');
weekdayList.forEach(weekdayItem => {
  weekdayItem.addEventListener('click', selectDay);
});

initialActivitiesList();

const deleteAllButton = document.querySelector('.js-deleteAll');
deleteAllButton.addEventListener('click', deleteAllActivitiesOfTheDay);

function deleteAllActivitiesOfTheDay() {
  const weekdayActive = document.querySelector('.weekday__item--active');
  const index = weekdayActive.getAttribute('data-day');

  activityList[index] = [];

  const modificator = getDayModificator(index);
  listActivities(activityList[index], modificator);
}

function initialActivitiesList() {
  const currentWeekDay = new Date().getDay();
  const modificator = getDayModificator(currentWeekDay);

  const weekdayItem = document.querySelector(`.weekday__item[data-day="${currentWeekDay}"]`);
  weekdayItem.classList.add('weekday__item--active');

  listActivities(activityList[currentWeekDay], modificator);
}

function selectDay(evt) {
  removeWeekdayActive();

  const weekdayItem = evt.target;
  const day = weekdayItem.getAttribute('data-day');
  const modificator = getDayModificator(day);

  weekdayItem.classList.add('weekday__item--active');
  listActivities(activityList[day], modificator);
}

function clearBoard() {
  const timeItem = document.querySelectorAll('.time__item');

  timeItem.forEach(item => {
    item.parentNode.removeChild(item);
  });

  scheduleList.innerHTML = '';
}

function removeWeekdayActive() {
  const weekdayItem = document.querySelector('.weekday__item--active');
  weekdayItem.classList.remove('weekday__item--active');
}

function listActivities(selectedActivities, modificator) {
  clearBoard();

  console.log(selectedActivities);
  selectedActivities.forEach(activity => {
    const timeItem = createTimeItem(activity, modificator)
    hourList.appendChild(timeItem);

    const scheduleAppointment = createScheduleAppointment();
    const scheduleItem = createScheduleItem(modificator);
    const scheduleText = createScheduleText(activity, modificator);
    const button = createDarkredButton();

    scheduleItem.appendChild(scheduleText);
    scheduleItem.appendChild(button);
    scheduleAppointment.appendChild(scheduleItem);
    scheduleList.appendChild(scheduleAppointment);
  });
}

function getDayModificator(index) {
  const weekdays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
  return weekdays[index];
}

function createTimeItem(activity, modificator) {
  const timeItemClass = 'time__item--' + modificator;
  const timeItem = document.createElement('li');
  timeItem.classList.add('time__item', timeItemClass);
  timeItem.textContent = activity.time;

  return timeItem;
}

function createScheduleItem(modificator) {
  const scheduleItemClass = 'schedule__item--' + modificator;
  const scheduleItem = document.createElement('div');
  scheduleItem.classList.add('schedule__item', scheduleItemClass);

  return scheduleItem;
}

function createScheduleText(activity) {
  const scheduleText = document.createElement('p');
  scheduleText.classList.add('schedule__text');
  scheduleText.textContent = activity.description;

  return scheduleText;
}

function createScheduleAppointment() {
  const scheduleAppointment = document.createElement('article');
  scheduleAppointment.classList.add('schedule__appointment');

  return scheduleAppointment;
}

function createDarkredButton() {
  const button = document.createElement('button');
  button.classList.add('button', 'button--darkred');
  button.textContent = 'Apagar';
  button.setAttribute('type', 'button');

  return button;
}