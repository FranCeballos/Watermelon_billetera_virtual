import React from "react";
import classes from "./ActivityItem.module.css";

const ActivityItem = (props) => {
  return (
    <li className={classes.container}>
      <div className={classes.box}>
        <p className={classes.title}>Deposit</p>
        <p className={classes.date}>02/03/2023</p>
      </div>
      <p className={classes.amount}>+ $23</p>
    </li>
  );
};

export default ActivityItem;
