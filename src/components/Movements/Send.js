import React, { useState } from "react";
import MovsWrapper from "../UI/Wrappers/MovsWrapper";
import classes from "./Send.module.css";
import InputApp from "../UI/Forms/InputApp";
import SelectApp from "../UI/Forms/SelectApp";
import ButtonNav from "../UI/Buttons/ButtonNav";

const Send = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  const [sendAmount, setSendAmount] = useState(0);
  return (
    <MovsWrapper>
      <div className={classes.content}>
        <p>Send</p>
        <div className={classes["contact-selector"]}>
          <InputApp
            title="Search contact"
            type="text"
            onChange={(value) => setSearchValue(value)}
          />
          <SelectApp />
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
        <ButtonNav title="Confirm" />
      </div>
    </MovsWrapper>
  );
};

export default Send;
