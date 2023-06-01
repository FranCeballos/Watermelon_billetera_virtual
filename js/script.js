"use-strict";

const welcomeSection = document.querySelector("#welcome");

class App {
  constructor() {
    let name = "";
    let isLoggedIn = false;
    let balance = 0;

    this.hide(welcomeSection);
  }

  show(element) {}

  update(element) {}

  hide(element) {
    welcomeSection.classList;
  }

  remove(element) {}
}

const app = new App();
