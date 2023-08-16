import React from "react";
import classes from "./ActivityList.module.css";
import ActivityItem from "./ActivityItem";

const ActivityList = (props) => {
  return (
    <ul className={classes.container}>
      <ActivityItem title="Book" date="12/12/23" amount={12} />
    </ul>
  );
};

export default ActivityList;
