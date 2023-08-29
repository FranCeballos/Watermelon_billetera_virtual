import SectionWrapper from "../UI/Wrappers/SectionWrapper";
import MovsSelector from "./MovsSelector";
import Send from "./Send";
import Deposit from "./Deposit";
import { useSelector } from "react-redux";

const MovementsContainer = (props) => {
  const view = useSelector((state) => state.ui.movementsView);
  const movsContent = {
    empty: null,
    send: <Send />,
    deposit: <Deposit />,
  };

  return (
    <SectionWrapper title="SEND & DEPOSIT" styles={{ padding: "10px" }}>
      <MovsSelector />
      {movsContent[view]}
    </SectionWrapper>
  );
};

export default MovementsContainer;
