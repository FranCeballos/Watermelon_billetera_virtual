import { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../../store/slices/uiSlice";
import MovsWrapper from "../UI/Wrappers/MovsWrapper";
import InputApp from "../UI/Forms/InputApp";
import classes from "./Deposit.module.css";
import ButtonNav from "../UI/Buttons/ButtonNav";
import {
  useGetBalanceAndMovementsQuery,
  usePostDepositMutation,
} from "../../services/walletService";

const Deposit = (props) => {
  const dispatch = useDispatch();
  const { refetch } = useGetBalanceAndMovementsQuery();
  const [depositAmount, setDepositAmount] = useState();
  const [postDeposit] = usePostDepositMutation();

  const depositHandler = async () => {
    if (parseFloat(depositAmount) > 0) {
      await postDeposit({ amount: parseFloat(depositAmount) });
      refetch();
      dispatch(close());
    }
  };
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
        <ButtonNav onClick={depositHandler} title="Confirm" />
      </div>
    </MovsWrapper>
  );
};

export default Deposit;
