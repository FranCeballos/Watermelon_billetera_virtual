import React from "react";
import SectionWrapper from "../UI/Wrappers/SectionWrapper";
import classes from "./BalanceContainer.module.css";

const BalanceContainer = (props) => {
  return (
    <SectionWrapper
      title="BALANCE"
      styles={{ backgroundColor: "rgba(0, 0, 0, 0.094)", marginBottom: 30 }}
    >
      <p className={classes.amount}>$0</p>
    </SectionWrapper>
  );
};

export default BalanceContainer;
