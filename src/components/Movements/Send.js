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
import { close } from "../../store/slices/uiSlice";

const Send = (props) => {
  const { refetch } = useGetBalanceAndMovementsQuery();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(null);
  const [sendAmount, setSendAmount] = useState(0);
  const [postSend] = usePostSendMutation();

  const sendHandler = async () => {
    if (parseFloat(sendAmount) > 0) {
      const result = await postSend({ email: searchValue, amount: sendAmount });
      if (!result.error) {
        refetch();
        dispatch(close());
      }
    }
  };
  return (
    <MovsWrapper>
      <div className={classes.content}>
        <p>Send</p>
        <div className={classes["contact-selector"]}>
          <InputApp
            title="@ Email of receiver"
            type="text"
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
          />
        </div>
        <InputApp
          title="$ Amount"
          error=""
          type="number"
          min={1}
          max={1000000}
          onChange={(value) => setSendAmount(value)}
          value={sendAmount}
        />
        <ButtonNav title="Confirm" onClick={sendHandler} />
      </div>
    </MovsWrapper>
  );
};

export default Send;
