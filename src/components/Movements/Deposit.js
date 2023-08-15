import { useState } from "react";
import MovsWrapper from "../UI/Wrappers/MovsWrapper";
import InputApp from "../UI/Forms/InputApp";
import classes from "./Deposit.module.css";
import ButtonNav from "../UI/Buttons/ButtonNav";

const Deposit = (props) => {
  const [depositAmount, setDepositAmount] = useState();
  console.log(depositAmount);
  return (
    <MovsWrapper>
      <div className={classes.content}>
        <p>Deposit</p>
        <InputApp
          title="Amount"
          error=""
          type="number"
          min={1}
          max={1000000}
          onChange={(value) => setDepositAmount(value)}
          value={depositAmount}
        />
        <ButtonNav title="Confirm" />
      </div>
    </MovsWrapper>
  );
};

export default Deposit;
