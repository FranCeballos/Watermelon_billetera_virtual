import React from "react";
import classes from "./DolarContainer.module.css";
import DolarItem from "./DolarItem";

const DolarContainer = (props) => {
  return (
    <section className={classes.container}>
      <DolarItem />
      <DolarItem />
    </section>
  );
};

export default DolarContainer;
