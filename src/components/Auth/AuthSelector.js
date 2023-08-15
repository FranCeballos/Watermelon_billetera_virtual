import React from "react";
import { motion } from "framer-motion";
import { buttonsVariant } from "./AuthVariants";
import classes from "./Auth.module.css";

const AuthSelector = ({ onNavigation }) => {
  return (
    <motion.div
      variants={buttonsVariant}
      key="buttons"
      className={classes["options-container"]}
    >
      <button
        onClick={() => onNavigation({ name: "login", speed: "fast" })}
        className={classes["btn__primary"]}
      >
        Sign In
      </button>
      <button
        onClick={() => onNavigation({ name: "signup", speed: "fast" })}
        className={classes["btn__secondary"]}
      >
        Create account
      </button>
    </motion.div>
  );
};

export default AuthSelector;
