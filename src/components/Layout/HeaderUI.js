import React from "react";
import ButtonAuthConfirm from "../UI/Buttons/ButtonAuthConfirm";
import classes from "./HeaderUI.module.css";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { close } from "../../store/slices/movementsSlice";

const HeaderUI = (props) => {
  const dispatch = useDispatch();
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
            <ButtonAuthConfirm
              title="LOGOUT"
              onClick={() => dispatch(close())}
            />
          </Form>
        </div>
      </div>
    </header>
  );
};

export default HeaderUI;
