import React from "react";
import classes from "./DolarItem.module.css";

const DolarItem = ({ buy = 0, sell = 0 }) => {
  return (
    <p className={classes["dolar__text"]}>
      Blue Dolar in $ARG <br />
      <span className={classes["dolar__text-alt"]}>
        Buy: ${buy} - Sell: ${sell}
      </span>
    </p>
  );
};

export default DolarItem;
