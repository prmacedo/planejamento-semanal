class Activity {
  static #activityList;

  static {
    this.#activityList = this.#initalizeData();
    this.saveInLocalStorage = this.saveInLocalStorage.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  static getActivitiesByDay(day) {
    return this.#activityList[day];
  }

  static deleteActivitiesByDay(day) {
    this.#activityList[day] = [];
  }

  static addActivity(activity, day) {
    const id = this.#findLastId() + 1;
    const newActivity = {
      id,
      ...activity
    }

    this.#activityList[day].push(newActivity);
    this.#activityList[day].sort(this.#compareFn);
  }

  static deleteActivityById(id, day) {
    const index = this.#activityList[day].map(activity => activity.id).indexOf(id);

    this.#activityList[day].splice(index, 1);
  };

  static saveInLocalStorage() {
    localStorage.setItem("activities", JSON.stringify(this.#activityList));
  }

  static clearLocalStorage() {
    localStorage.clear();
    this.#activityList = [[], [], [], [], [], [], []];
  }

  static #initalizeData() {
    const activities = JSON.parse(localStorage.getItem("activities"));
    const empty = [[], [], [], [], [], [], []];

    return activities || empty;
  }

  static #findLastId() {
    let last_id = 0;

    this.#activityList.forEach(day => {
      day.forEach(activity => {
        if(activity.id > last_id) {
          last_id = activity.id;
        }
      })
    });

    return last_id;
  }

  static #compareFn(activityA, activityB) {
    if (activityA.time < activityB.time) {
      return -1;
    }

    if (activityA.time > activityB.time) {
      return 1;
    }

    return 0;
  }

  static #mockup() {
    return [
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
          id: 18,
          description: 'Descanso',
          time: '20h30m'
        }
      ]  // Sábado
    ];
  }
}

export { Activity };