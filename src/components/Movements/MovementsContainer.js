import { useState } from "react";
import SectionWrapper from "../UI/Wrappers/SectionWrapper";
import MovsSelector from "./MovsSelector";
import Send from "./Send";
import Deposit from "./Deposit";

const MovementsContainer = (props) => {
  const [view, setView] = useState("empty");
  const movsContent = {
    empty: null,
    send: <Send />,
    deposit: <Deposit />,
  };

  return (
    <SectionWrapper title="SEND & DEPOSIT" styles={{ padding: "10px" }}>
      <MovsSelector
        view={view}
        onCancel={() => setView("empty")}
        onChangeToDeposit={() => setView("deposit")}
        onChangeToSend={() => setView("send")}
      />
      {movsContent[view]}
    </SectionWrapper>
  );
};

export default MovementsContainer;
