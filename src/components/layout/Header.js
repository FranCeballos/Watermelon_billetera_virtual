import React from "react";
import ButtonAuthConfirm from "../UI/Buttons/ButtonAuthConfirm";
import classes from "./Header.module.css";
import { Form } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={classes.container}>
      <div className={classes.nav}>
        <div className={classes["header__left-empty"]}></div>
        <div className={classes["header__image-box"]}>
          <img
            className={classes["header__image"]}
            src="/assets/watermelon-clear.png"
            alt="watermelon logo"
          />
        </div>
        <div className={classes["header__logout"]}>
          <Form action="/logout" method="post">
            <ButtonAuthConfirm title="LOGOUT" />
          </Form>
        </div>
      </div>
    </header>
  );
};

export default Header;
