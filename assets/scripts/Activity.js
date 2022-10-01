class Activity {
  static #activityList;

  static {
    Activity.#activityList = this.#mockup();
  }

  static getActivitiesByDay(day) {
    return this.#activityList[day];
  }

  static deleteActivitiesByDay(day) {
    this.#activityList[day] = [];
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
          id: 12,
          description: 'Descanso',
          time: '20h30m'
        }
      ]  // Sábado
    ];
  }
}

export { Activity };