import React from "react";
import { motion } from "framer-motion";
import { signinVariant } from "./AuthVariants";
import classes from "./Auth.module.css";

const Login = ({ onNavigation }) => {
  return (
    <motion.form
      variants={signinVariant}
      key="login"
      className={classes["auth-container"]}
    >
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
          Sign In
        </button>
      </div>
    </motion.form>
  );
};

export default Login;
