import { Activity } from "./Activity.js";

class LocalStorageButton {
  constructor() {
    this.#addSaveEvent();
  }

  #addSaveEvent(){
    const saveButton = document.querySelector(".js-saveLocalStorage");
    saveButton.addEventListener("click", Activity.saveInLocalStorage);
  }
}

export { LocalStorageButton };