import React from "react";
import ButtonAuthConfirm from "../UI/Buttons/ButtonAuthConfirm";
import classes from "./Header.module.css";
import { setUser } from "../../store/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser({ _id: null, email: null }));
    navigate("/auth");
  };

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
          <ButtonAuthConfirm title="LOGOUT" onClick={logoutHandler} />
        </div>
      </div>
    </header>
  );
};

export default Header;
