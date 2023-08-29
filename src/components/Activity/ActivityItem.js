import React from "react";
import classes from "./ActivityItem.module.css";

const ActivityItem = ({ title, date, amount }) => {
  return (
    <li className={classes.container}>
      <div className={classes.box}>
        <p className={classes.title}>{title}</p>
        <p className={classes.date}>{date}</p>
      </div>
      <p className={classes.amount}>${amount}</p>
    </li>
  );
};

export default ActivityItem;
