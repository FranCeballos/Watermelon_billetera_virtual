import React from "react";
import classes from "./DolarItem.module.css";

const DolarItem = ({ title, buy = 0, sell = 0 }) => {
  return (
    <p className={classes["dolar__text"]}>
      {title}
      <br />
      <span className={classes["dolar__text-alt"]}>
        Buy: ${buy} - Sell: ${sell}
      </span>
    </p>
  );
};

export default DolarItem;
