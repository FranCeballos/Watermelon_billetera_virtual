import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authVariant } from "./AuthVariants";
import classes from "./Auth.module.css";
import {
  usePostSignupMutation,
  usePostLoginMutation,
  authApi,
} from "../../services/authService";
import InputAuth from "../UI/Forms/InputAuth";
import { useDispatch, useSelector } from "react-redux";
import { setErrors } from "../../store/slices/authSlice";

const AuthForm = ({ isLogin }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);
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
    if (signupResult.isSuccess) {
      navigate("/auth?mode=success", { replace: "false" });
    }
    if (signupResult.isSuccess || loginResult.isSuccess) {
      dispatch(setErrors({}));
    }
    if (signupResult.isError || loginResult.isError) {
      if (signupResult.isError) {
        console.log("isError Signup");
      }
      if (loginResult.isError) {
        console.log("isError Signup");
      }
      dispatch(
        setErrors(isLogin ? loginResult.error?.data : signupResult.error?.data)
      );
    }
  }, [signupResult, loginResult, navigate, dispatch, isLogin]);

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
      initial="hidden"
      animate="animate"
      exit="exit"
      key="login"
      className={classes["auth-container"]}
    >
      <h1 className={classes.title}>
        {isLogin ? "Welcome" : "Create account"}
      </h1>
      {!isLogin && (
        <InputAuth
          inputRef={nameRef}
          type="text"
          placeholder="Full Name"
          error={errors.name}
        />
      )}
      <InputAuth
        inputRef={emailRef}
        type="email"
        placeholder="Email"
        error={errors.email}
      />
      <InputAuth
        inputRef={passwordRef}
        type="password"
        placeholder="Password"
        error={errors.password}
      />
      {!isLogin && (
        <InputAuth
          inputRef={passwordConfirmRef}
          type="password"
          placeholder="Confirm Password"
          error={errors.passwordConfirm}
        />
      )}
      <div className={classes["auth-buttons"]}>
        {loginResult.isLoading || signupResult.isLoading ? (
          <>
            <div></div>
            <button
              type="button"
              className={classes["btn__secondary-outlined"]}
            >
              Loading...
            </button>
          </>
        ) : (
          <>
            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              className={classes["btn__secondary"]}
              onClick={() => {
                dispatch(setErrors({}));
                dispatch(authApi.util.resetApiState());
              }}
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
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AuthForm;
