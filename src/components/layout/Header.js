import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.container}>
      <div className={classes["header__image-box"]}>
        <img
          className={classes["header__image"]}
          src="/assets/watermelon-clear.png"
          alt="watermelon logo"
        />
      </div>
    </header>
  );
};

export default Header;
