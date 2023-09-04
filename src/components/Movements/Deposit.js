import { useState } from "react";
import { useDispatch } from "react-redux";
import { close } from "../../store/slices/movementsSlice";
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
  const [depositAmount, setDepositAmount] = useState(null);
  const [postDeposit, depositResponse] = usePostDepositMutation();

  if (depositResponse.isSuccess) {
    refetch();
    dispatch(close());
  }

  const depositHandler = () => {
    postDeposit({ amount: parseFloat(depositAmount) });
  };

  return (
    <MovsWrapper>
      <div className={classes.content}>
        <p>Deposit</p>
        <InputApp
          placeholder="$ Amount"
          type="number"
          min={1}
          max={1000000}
          onChange={(value) => setDepositAmount(value)}
          value={depositAmount}
          error={
            depositResponse.isError ? depositResponse.error.data.amount : null
          }
        />
        {depositResponse.isLoading ? (
          <ButtonNav title="Loading..." />
        ) : (
          <ButtonNav onClick={depositHandler} title="Confirm" />
        )}
      </div>
    </MovsWrapper>
  );
};

export default Deposit;
