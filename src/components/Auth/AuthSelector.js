import React from "react";
import { motion } from "framer-motion";
import { buttonsVariant } from "./AuthVariants";
import classes from "./Auth.module.css";
import { Link } from "react-router-dom";

const AuthSelector = ({ onNavigation }) => {
  return (
    <motion.div
      variants={buttonsVariant}
      key="buttons"
      className={classes["options-container"]}
    >
      <Link to="?mode=login" className={classes["btn__primary"]}>
        Log In
      </Link>
      <Link to="?mode=signup" className={classes["btn__secondary"]}>
        Create account
      </Link>
    </motion.div>
  );
};

export default AuthSelector;
