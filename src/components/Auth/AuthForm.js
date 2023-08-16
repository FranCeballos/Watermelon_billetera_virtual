import React from "react";
import { motion } from "framer-motion";
import { authVariant } from "./AuthVariants";
import classes from "./Auth.module.css";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  return (
    <motion.form
      variants={authVariant}
      key="login"
      className={classes["auth-container"]}
    >
      {!isLogin && (
        <input type="text" className={classes.input} placeholder="Full Name" />
      )}
      <input type="email" className={classes.input} placeholder="Email" />
      <input type="password" className={classes.input} placeholder="Password" />
      {!isLogin && (
        <input
          type="password"
          className={classes.input}
          placeholder="Confirm Password"
        />
      )}
      <div className={classes["auth-buttons"]}>
        <Link
          to={`?mode=${isLogin ? "signup" : "login"}`}
          className={classes["btn__secondary"]}
        >
          {isLogin ? "Create account" : "Have an account?"}
        </Link>
        <button
          type="submit"
          onClick={() => {}}
          className={classes["btn__secondary-outlined"]}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </div>
    </motion.form>
  );
};

export default AuthForm;
