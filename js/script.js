"use-strict";

const logInSection = document.querySelector("#logIn");
const logInInput = document.querySelector("#login-input-name");
const logInButton = document.querySelector(".logIn__button");
const logInErrorText = document.querySelector(".welcome__error-text");

const appSection = document.querySelector("#app");

const oficialDolarText = document.querySelector("#dolar-oficial");
const blueDolarText = document.querySelector("#dolar-blue");

const movementsSection = document.querySelector("#movements");
const sendSection = document.querySelector(".movements__actions-send");
const receiveSection = document.querySelector(".movements__actions-receive");
const sendButton = document.querySelector("#button-send");
const receiveButton = document.querySelector("#button-receive");
const closeMovButton = document.querySelector("#button-mov-close");

const users = [
  {
    name: "fran",
    balance: 0,
    activity: [],
  },
];

class App {
  name = "";
  isLoggedIn = false;
  balance = 0;
  constructor() {
    this.#init();
  }

  // User Data Methods
  #userExists(username) {
    return users.filter((user) => user.name === username).length > 0;
  }

  // Dolar Methods
  async #fetchDolar() {
    const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
    const dolarData = await response.json();
    return dolarData;
  }

  async #showDolar() {
    const dolarValue = await this.#fetchDolar();
    oficialDolarText.innerHTML = `Buy: ${dolarValue.oficial.value_buy} - Sell: ${dolarValue.oficial.value_sell}`;
    blueDolarText.innerHTML = `Buy: ${dolarValue.blue.value_buy} - Sell: ${dolarValue.blue.value_sell}`;
  }

  // LogIn Methods

  #getIsLoggedIn() {
    return localStorage.getItem("isLogged") === "true" || false;
  }

  #logIn() {
    const usernameValue = logInInput.value;
    localStorage.setItem("isLogged", true);
    if (usernameValue.length === 0) {
      return this.#showErrorMessage(logInErrorText, "Enter username");
    }
    if (!this.#userExists(usernameValue)) {
      return this.#showErrorMessage(logInErrorText, "User not registered");
    }
    this.#showAppView(1000, 1000);
  }

  #logOut() {
    localStorage.setItem("isLogged", false);
    this.#showLogInView();
  }

  // UI Controls
  #addEle(domElement, displayValue) {
    domElement.style.display = displayValue;
  }

  #showEle(domElement) {
    domElement.classList.remove("hidden");
  }

  #updateUI(domElement) {}

  #removeEle(domElement) {
    domElement.style.display = "none";
  }

  #hideEle(domElement) {
    logInSection.classList.add("hidden");
  }

  #hideAndRemove(domElement, delay = 0) {
    this.#hideEle(domElement);
    setTimeout(() => this.#removeEle(domElement), delay);
  }

  #addAndShow(domElement, displayValue, delay = 0) {
    this.#addEle(domElement, displayValue);
    setTimeout(() => this.#showEle(domElement), delay);
  }

  #showLogInView() {
    this.#hideAndRemove(appSection, 0);
    this.#addAndShow(logInSection, "flex", 1000);
  }

  #showAppView(exitDelay, enterDelay) {
    this.#hideAndRemove(logInSection, exitDelay);
    this.#addAndShow(appSection, "flex", enterDelay);
  }

  #showErrorMessage(domElement, message) {
    this.#addAndShow(domElement);
    domElement.innerHTML = message;
  }

  // SEND AND RECEIVE
  #toggleMovementsSectionHeight(view) {
    console.log(view);
    view === "none"
      ? (movementsSection.style.height = "14rem")
      : (movementsSection.style.height = "22.5rem");
  }

  #changeActiveMovButton(view) {
    switch (view) {
      case "none":
        sendButton.classList.remove("active");
        receiveButton.classList.remove("active");
        break;
      case "send":
        sendButton.classList.add("active");
        receiveButton.classList.remove("active");
        break;
      case "receive":
        sendButton.classList.remove("active");
        receiveButton.classList.add("active");
    }
  }

  #updateMovementsView(view) {
    switch (view) {
      case "none":
        this.#hideAndRemove(sendSection);
        this.#hideAndRemove(receiveSection);
        this.#toggleMovementsSectionHeight(view);
        this.#hideAndRemove(closeMovButton);
        break;
      case "send":
        this.#hideAndRemove(receiveSection);
        setTimeout(() => this.#addAndShow(sendSection, "flex", 1000), 50);
        this.#toggleMovementsSectionHeight(view);
        this.#addAndShow(closeMovButton, "flex", 1000);
        break;
      case "receive":
        this.#hideAndRemove(sendSection);
        setTimeout(() => this.#addAndShow(receiveSection, "flex", 50));
        this.#toggleMovementsSectionHeight(view);
        this.#addAndShow(closeMovButton, "flex", 1000);
        break;
    }
    this.#changeActiveMovButton(view);
  }

  #changeMovementsView(view) {
    this.#updateMovementsView(view);
  }

  //   UNIT
  #init() {
    const isLoggedIn = this.#getIsLoggedIn();
    isLoggedIn ? this.#showAppView(0, 1000) : this.#showLogInView();
    this.#showDolar();
    this.#addEventListeners();
    this.#changeMovementsView("none");
  }

  #addEventListeners() {
    logInButton.addEventListener("click", () => {
      this.#logIn();
    });
    sendButton.addEventListener("click", () => {
      this.#changeMovementsView("send");
    });
    receiveButton.addEventListener("click", () => {
      this.#changeMovementsView("receive");
    });
    closeMovButton.addEventListener("click", () => {
      this.#changeMovementsView("none");
    });
  }
}

const app = new App();
