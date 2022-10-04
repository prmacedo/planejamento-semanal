import { Activity } from "./Activity.js";
import { DOM } from "./DOM.js";

const myDOM = new DOM();

class Form {
  constructor() {
    this.#addCreateActivityEvent();
  }

  #addCreateActivityEvent() {
    const submitButton = document.querySelector('.js-submit');
    submitButton.addEventListener('click', this.#handleSubmit);
  }

  #handleSubmit = (evt) => {
    evt.preventDefault();
    const description = document.querySelector('.js-formActivity').value;

    if (description) {
      const activity = {
        description: document.querySelector('.js-formActivity').value,
        time: document.querySelector('.js-formTime').value
      };

      const day = Number(document.querySelector('.js-formWeekday').value);

      Activity.addActivity(activity, day);

      myDOM.listActivities(day);

      this.#resetFields();
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  #resetFields() {
    document.querySelector('.js-formActivity').value = "";
    document.querySelector('.js-formTime').value = "00h00m";
    document.querySelector('.js-timeSelect .js-selectText').textContent = "00h";
    document.querySelector('.js-timeSelect .js-selectInput').value = "00";
  }
}

export { Form };