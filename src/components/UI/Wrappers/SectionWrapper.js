import React from "react";
import classes from "./SectionWrapper.module.css";
const SectionWrapper = ({ children, title, styles = {} }) => {
  return (
    <section className={classes.wrapper} style={styles}>
      <h2 className={classes.title}> {title}</h2>
      {children}
    </section>
  );
};

export default SectionWrapper;
