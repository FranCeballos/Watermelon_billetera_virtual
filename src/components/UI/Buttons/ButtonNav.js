import React from "react";
import { motion } from "framer-motion";

import classes from "./ButtonNav.module.css";

const ButtonNav = ({ title, onClick, isActive, type }) => {
  return (
    <motion.button
      type={type}
      animate={{ backgroundColor: isActive ? "#ff2e63" : "#00adb5" }}
      whileHover={{ backgroundColor: "#393e46" }}
      whileTap={{
        backgroundColor: "#393e4699",
      }}
      className={isActive ? classes["button-active"] : classes.button}
      onClick={onClick}
    >
      {title}
    </motion.button>
  );
};

export default ButtonNav;
