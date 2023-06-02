"use-strict";

const logInSection = document.querySelector("#logIn");
const appSection = document.querySelector("#app");

class App {
  constructor() {
    let name = "";
    let isLoggedIn = false;
    let balance = 0;

    this.#init();
  }

  #getIsLoggedIn() {
    return localStorage.getItem("isLogged") === "true" || false;
  }

  #logIn() {
    localStorage.setItem("isLogged", true);
    this.#hideAndRemove(logInSection);
    this.#addAndShow(appSection);
  }

  #logOut() {
    localStorage.setItem("isLogged", false);
    this.#hideAndRemove(appSection);
    this.#addAndShow(logInSection);
  }

  //   UI Controls
  #addEle(domElement) {
    domElement.style.display = "flex";
  }

  #showEle(domElement) {
    logInSection.classList.remove("hidden");
  }

  #updateEle(domElement) {}

  #removeEle(domElement) {
    domElement.style.display = "none";
  }

  #hideEle(domElement) {
    logInSection.classList.add("hidden");
  }

  #hideAndRemove(domElement) {
    this.#hideEle(domElement);
    this.#removeEle(domElement);
  }

  #addAndShow(domElement) {
    this.#addEle(domElement);
    this.#showEle(domElement);
  }

  #init() {
    const isLoggedIn = this.#getIsLoggedIn();
    isLoggedIn ? this.#logIn() : this.#logOut();
  }
}

const app = new App();
