import React from "react";
import { motion } from "framer-motion";
import { signinVariant } from "./AuthVariants";
import classes from "./Auth.module.css";

const Signup = ({ onNavigation }) => {
  return (
    <motion.form
      variants={signinVariant}
      key="signup"
      className={classes["auth-container"]}
    >
      <input type="text" className={classes.input} placeholder="Full Name" />
      <input type="email" className={classes.input} placeholder="Email" />
      <input type="password" className={classes.input} placeholder="Password" />
      <div className={classes["auth-buttons"]}>
        <button
          type="button"
          className={classes["btn__secondary"]}
          onClick={() => onNavigation({ name: "selector", speed: "fast" })}
        >
          Back
        </button>
        <button
          type="submit"
          onClick={() => onNavigation("signin")}
          className={classes["btn__secondary-outlined"]}
        >
          Sign Up
        </button>
      </div>
    </motion.form>
  );
};

export default Signup;
