import React, { useState } from "react";
import MovsWrapper from "../UI/Wrappers/MovsWrapper";
import classes from "./Send.module.css";
import InputApp from "../UI/Forms/InputApp";
import ButtonNav from "../UI/Buttons/ButtonNav";
import {
  useGetBalanceAndMovementsQuery,
  usePostSendMutation,
} from "../../services/walletService";
import { useDispatch } from "react-redux";
import { close } from "../../store/slices/movementsSlice";

const Send = (props) => {
  const dispatch = useDispatch();
  const { refetch } = useGetBalanceAndMovementsQuery();
  const [searchValue, setSearchValue] = useState(null);
  const [sendAmount, setSendAmount] = useState(null);
  const [postSend, sendResult] = usePostSendMutation();

  const sendHandler = async () => {
    const result = await postSend({ email: searchValue, amount: sendAmount });
    if (!result.error) {
      refetch();
      dispatch(close());
    }
  };

  return (
    <MovsWrapper>
      <div className={classes.content}>
        <p className={classes.title}>Send</p>
        <InputApp
          placeholder="@ Email of receiver"
          type="text"
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          error={sendResult.error ? sendResult.error.data.email : null}
        />
        <InputApp
          placeholder="$ Amount"
          type="number"
          min={1}
          max={1000000}
          onChange={(value) => setSendAmount(value)}
          value={sendAmount}
          error={sendResult.error ? sendResult.error.data.amount : null}
        />
        {sendResult.isLoading ? (
          <ButtonNav title="Loading..." />
        ) : (
          <ButtonNav title="Confirm" onClick={sendHandler} />
        )}
      </div>
    </MovsWrapper>
  );
};

export default Send;
