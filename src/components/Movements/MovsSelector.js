import React from "react";
import classes from "./MovsSelector.module.css";
import ButtonNav from "../UI/Buttons/ButtonNav";
import { useSelector, useDispatch } from "react-redux";
import { showDeposit, showSend, close } from "../../store/slices/uiSlice";
import { motion } from "framer-motion";

const MovsSelector = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.ui.movementsView);

  return (
    <div className={classes.container}>
      <ButtonNav
        onClick={() => dispatch(showSend())}
        title="SEND"
        type="button"
        isActive={view === "send"}
      />
      <ButtonNav
        onClick={() => dispatch(showDeposit())}
        title="DEPOSIT"
        type="button"
        isActive={view === "deposit"}
      />
      {view !== "empty" && (
        <motion.button
          onClick={() => dispatch(close())}
          whileHover={{ backgroundColor: "#393e46aa" }}
          whileTap={{ backgroundColor: "#393e4666" }}
          type="button"
          className={classes["button-cancel"]}
        >
          <i className="fa-solid fa-xmark"></i>
        </motion.button>
      )}
    </div>
  );
};

export default MovsSelector;
