import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authVariant } from "./AuthVariants";
import classes from "./Auth.module.css";
import {
  usePostSignupMutation,
  usePostLoginMutation,
} from "../../services/authService";

const AuthForm = ({ isLogin }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [postSignup, signupResult] = usePostSignupMutation();
  const [postLogin, loginResult] = usePostLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginResult.isSuccess) {
      const user = loginResult.data.user;
      localStorage.setItem("token", user.token);

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      navigate("/app", { replace: "false" });
    }
    if (signupResult.isSuccess)
      navigate("/auth?mode=success", { replace: "false" });
  }, [signupResult, loginResult, navigate]);

  const onSubmitHandler = async () => {
    isLogin
      ? postLogin({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      : postSignup({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          passwordConfirm: passwordConfirmRef.current.value,
        });
  };

  return (
    <motion.div
      variants={authVariant}
      key="login"
      className={classes["auth-container"]}
    >
      {!isLogin && (
        <input
          ref={nameRef}
          type="text"
          className={classes.input}
          placeholder="Full Name"
        />
      )}
      <input
        ref={emailRef}
        type="email"
        className={classes.input}
        placeholder="Email"
      />
      <input
        ref={passwordRef}
        type="password"
        className={classes.input}
        placeholder="Password"
      />
      {!isLogin && (
        <input
          ref={passwordConfirmRef}
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
          type="button"
          onClick={onSubmitHandler}
          className={classes["btn__secondary-outlined"]}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </div>
    </motion.div>
  );
};

export default AuthForm;
