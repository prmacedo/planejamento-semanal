import { Activity } from "./Activity.js";
import { Board } from "./Board.js";

const board = new Board();

class Form {
  constructor() {
    this.#addCreateActivityEvent();
  }

  #addCreateActivityEvent() {
    const submitButton = document.querySelector('.js-submit');
    submitButton.addEventListener('click', this.#handleSubmit);
  }

  #handleSubmit(evt) {
    evt.preventDefault();
    const description = document.querySelector('.js-formActivity').value;

    if (description) {
      const activity = {
        description: document.querySelector('.js-formActivity').value,
        time: document.querySelector('.js-formTime').value
      };

      const day = Number(document.querySelector('.js-formWeekday').value);

      Activity.addActivity(activity, day);

      board.listActivities(day);
    } else {
      alert('Preencha todos os campos corretamente!');
    }

  }
}

export { Form };