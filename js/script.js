"use-strict";

const logInSection = document.querySelector("#logIn");
const logInInput = document.querySelector("#login-input-name");
const logInButton = document.querySelector(".logIn__button");
const logInErrorText = document.querySelector(".welcome__error-text");
const appSection = document.querySelector("#app");

const oficialDolarText = document.querySelector("#dolar-oficial");
const blueDolarText = document.querySelector("#dolar-blue");

const balanceTextEle = document.querySelector(".balance__amount");

const sendSection = document.querySelector(".movements__actions-send");
const depositSection = document.querySelector(".movements__actions-receive");
const sendNavButton = document.querySelector("#button-send");
const depositNavButton = document.querySelector("#button-receive");
const closeMovButton = document.querySelector("#button-mov-close");
const depositInput = document.querySelector("#receive-input");
const depositInputErrorText = document.querySelector(".receive__error-text");
const depositConfirmButton = document.querySelector("#receive-confirm");

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

  #removeEle(domElement) {
    domElement.style.display = "none";
  }

  #hideEle(domElement) {
    domElement.classList.add("hidden");
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
    this.#addAndShow(domElement, "inline-block");
    domElement.innerHTML = message;
  }

  #resetErrorMessages() {
    this.#hideAndRemove(logInErrorText);
    this.#hideAndRemove(depositInputErrorText);
  }

  #resetInputs() {
    logInInput.value = "";
    depositInput.value = "";
  }

  #updateUI() {}

  #updateBalance() {
    balanceTextEle.innerHTML = `$${this.balance}`;
  }

  #resetMovementsView() {
    this.#changeMovementsView("none");
    this.#resetInputs();
    this.#resetErrorMessages();
  }

  #resetInputsAndErrors() {}

  #updateActivity() {}

  // Money Movements
  #receiveMoney() {
    const depositValue = parseFloat(depositInput.value);
    if (isNaN(depositValue) || depositValue === 0) {
      console.log("DepositInput: Select an amount bigger than 0.");
      return this.#showErrorMessage(
        depositInputErrorText,
        "Select an amount bigger than 0."
      );
    }
    console.log(depositValue);
    this.balance += depositValue;
    this.#updateBalance();
    this.#resetMovementsView();
    Toastify({
      text: `You had a deposit of $${depositValue}.`,
      duration: 3000,
    }).showToast();
  }

  #sendMoney(amount, user) {}

  // SEND AND RECEIVE
  #changeActiveMovButton(view) {
    switch (view) {
      case "none":
        sendNavButton.classList.remove("active");
        depositNavButton.classList.remove("active");
        this.#resetInputs();
        this.#resetErrorMessages();
        break;
      case "send":
        sendNavButton.classList.add("active");
        depositNavButton.classList.remove("active");
        break;
      case "receive":
        sendNavButton.classList.remove("active");
        depositNavButton.classList.add("active");
    }
  }

  #changeMovementsView(view) {
    switch (view) {
      case "none":
        this.#hideAndRemove(sendSection);
        this.#hideAndRemove(depositSection);
        this.#hideAndRemove(closeMovButton);
        break;
      case "send":
        this.#hideAndRemove(depositSection, 100);
        setTimeout(() => this.#addAndShow(sendSection, "flex", 100), 100);
        this.#addAndShow(closeMovButton, "flex", 1000);
        break;
      case "receive":
        this.#hideAndRemove(sendSection, 100);
        setTimeout(() => this.#addAndShow(depositSection, "flex", 100), 100);
        this.#addAndShow(closeMovButton, "flex", 1000);
        break;
    }
    this.#changeActiveMovButton(view);
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
    sendNavButton.addEventListener("click", () => {
      this.#changeMovementsView("send");
    });
    depositNavButton.addEventListener("click", () => {
      this.#changeMovementsView("receive");
    });
    closeMovButton.addEventListener("click", () => {
      this.#changeMovementsView("none");
    });
    depositConfirmButton.addEventListener("click", () => {
      this.#receiveMoney();
    });
  }
}

const app = new App();
