import { Activity } from "./Activity.js";
import { DOM } from "./DOM.js";

const myDOM = new DOM();

class LocalStorageButton {
  constructor() {
    this.#addSaveEvent();
    this.#addDeleteEvent();
  }

  #addSaveEvent() {
    const saveButton = document.querySelector(".js-saveLocalStorage");
    saveButton.addEventListener("click", Activity.saveInLocalStorage);
  }

  #addDeleteEvent() {
    const deleteButton = document.querySelector(".js-deleteLocalStorage");
    deleteButton.addEventListener("click", this.#handleDeleteLocalStorage);
  }

  #handleDeleteLocalStorage() {
    Activity.clearLocalStorage();
    myDOM.clearBoard();
  }
}

export { LocalStorageButton };