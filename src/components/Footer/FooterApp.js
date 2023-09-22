import React from "react";
import classes from "./FooterApp.module.css";

const FooterApp = (props) => {
  return (
    <footer className={classes.container}>
      <div className={classes.left}>
        <p className={classes.text}>Developed by Francisco Ceballos</p>
      </div>
      <div className={classes.center}>
        <img
          className={classes["logo__watermelon"]}
          src="/assets/watermelon-clear.png"
          alt="Watermelon App Logo"
        />
      </div>
      <div className={classes.right}>
        <a
          href="https://github.com/FranCeballos/watermelon-wallet-front.git"
          target="_blank"
          rel="noreferrer"
          className={classes["logo__container-github"]}
        >
          <img
            className={classes["logo__github"]}
            src="/assets/github.png"
            alt="GitHub Logo"
          />
        </a>
      </div>
    </footer>
  );
};

export default FooterApp;
