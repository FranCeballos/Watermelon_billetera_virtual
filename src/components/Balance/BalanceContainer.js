import React from "react";
import SectionWrapper from "../UI/Wrappers/SectionWrapper";
import classes from "./BalanceContainer.module.css";
import { useGetBalanceAndMovementsQuery } from "../../services/walletService";

const BalanceContainer = (props) => {
  const { data } = useGetBalanceAndMovementsQuery();
  return (
    <SectionWrapper
      title="BALANCE"
      styles={{ backgroundColor: "rgba(0, 0, 0, 0.094)", marginBottom: 30 }}
    >
      <p className={classes.amount}>${data?.balance || "0"}</p>
    </SectionWrapper>
  );
};

export default BalanceContainer;
