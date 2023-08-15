import React from "react";
import classes from "./MovsWrapper.module.css";
const MovsWrapper = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default MovsWrapper;
