import React from "react";
import classes from "./DolarItem.module.css";

const DolarItem = (props) => {
  return (
    <p className={classes["dolar__text"]}>
      Blue Dolar in $ARG <br />
      <span className={classes["dolar__text-alt"]}>Buy: 0 - Sell: 0</span>
    </p>
  );
};

export default DolarItem;
