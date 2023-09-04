import React from "react";
import { motion } from "framer-motion";

import classes from "./ButtonAuthConfirm.module.css";

const ButtonAuthConfirm = ({ title, onClick, type }) => {
  return (
    <motion.button
      type={type}
      whileHover={{ backgroundColor: "rgba(77, 98, 100, 0.179)" }}
      whileTap={{
        backgroundColor: "#393e4699",
      }}
      className={classes.button}
      onClick={onClick}
    >
      {title}
    </motion.button>
  );
};

export default ButtonAuthConfirm;
