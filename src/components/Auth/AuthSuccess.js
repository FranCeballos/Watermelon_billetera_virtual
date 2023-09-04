import React from "react";
import { motion } from "framer-motion";
import { authVariant } from "./AuthVariants";
import classes from "./Auth.module.css";
import { Link } from "react-router-dom";

const AuthSuccess = (props) => {
  return (
    <motion.div
      variants={authVariant}
      key="buttons"
      className={classes["success__container"]}
    >
      <h1 className={classes["success__title"]}>
        Account created successfully ✅
      </h1>
      <Link to="?mode=login" className={classes["btn__primary"]}>
        Log In
      </Link>
    </motion.div>
  );
};

export default AuthSuccess;
