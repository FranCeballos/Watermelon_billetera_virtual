import React from "react";
import classes from "./SelectApp.module.css";

const SelectApp = ({ defaultValue = "Select an option" }) => {
  return (
    <div className={classes.container}>
      <select className={classes.select}>
        <option selected value={"name"}>
          {defaultValue}
        </option>
      </select>
    </div>
  );
};

export default SelectApp;
