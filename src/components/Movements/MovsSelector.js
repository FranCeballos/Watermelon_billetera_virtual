import React from "react";
import classes from "./MovsSelector.module.css";
import ButtonNav from "../UI/Buttons/ButtonNav";
import { motion } from "framer-motion";

const MovsSelector = ({
  view,
  onCancel,
  onChangeToSend,
  onChangeToDeposit,
}) => {
  return (
    <div className={classes.container}>
      <ButtonNav
        onClick={onChangeToSend}
        title="SEND"
        type="button"
        isActive={view === "send"}
      />
      <ButtonNav
        onClick={onChangeToDeposit}
        title="DEPOSIT"
        type="button"
        isActive={view === "deposit"}
      />
      {view !== "empty" && (
        <motion.button
          onClick={onCancel}
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
