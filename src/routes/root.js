import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./root.module.css";
import AnimatedLogo from "../components/UI/AnimatedLogo";

const buttonsVariant = {
  hidden: {
    opacity: 0,
  },
  slow: { opacity: 1, transition: { delay: 4.5, duration: 1, type: "spring" } },
  fast: { opacity: 1, transition: { delay: 0, duration: 1, type: "spring" } },
  exit: {
    opacity: 0,
    transition: { duration: 5, type: "spring" },
  },
};

const signinVariant = {
  hidden: {
    opacity: 0,
  },
  fast: { opacity: 1, transition: { duration: 1, type: "spring" } },
  exit: {
    opacity: 0,
    transition: { duration: 5, type: "spring" },
  },
};

const Root = () => {
  const [view, setView] = useState({ name: "selector", speed: "slow" });

  const content = {
    selector: (
      <motion.div
        variants={buttonsVariant}
        key="buttons"
        className={classes["options-container"]}
      >
        <button
          onClick={() => setView({ name: "login", speed: "fast" })}
          className={classes["btn__primary"]}
        >
          Sign In
        </button>
        <button
          onClick={() => setView({ name: "signup", speed: "fast" })}
          className={classes["btn__secondary"]}
        >
          Create account
        </button>
      </motion.div>
    ),
    login: (
      <motion.form
        variants={signinVariant}
        key="login"
        className={classes["auth-container"]}
      >
        <input type="email" className={classes.input} placeholder="Email" />
        <input
          type="password"
          className={classes.input}
          placeholder="Password"
        />
        <div className={classes["auth-buttons"]}>
          <button
            type="button"
            className={classes["btn__secondary"]}
            onClick={() => setView({ name: "selector", speed: "fast" })}
          >
            Back
          </button>
          <button
            type="submit"
            onClick={() => setView("signin")}
            className={classes["btn__secondary-outlined"]}
          >
            Sign In
          </button>
        </div>
      </motion.form>
    ),
    signup: (
      <motion.form
        variants={signinVariant}
        key="signup"
        className={classes["auth-container"]}
        autoComplete="off"
      >
        <input type="text" className={classes.input} placeholder="Full Name" />
        <input
          type="email"
          className={classes.input}
          placeholder="Email"
          autoComplete="off"
        />
        <input
          type="password"
          className={classes.input}
          placeholder="Password"
          autoComplete="off"
        />
        <div className={classes["auth-buttons"]}>
          <button
            type="button"
            className={classes["btn__secondary"]}
            onClick={() => setView({ name: "selector", speed: "fast" })}
          >
            Back
          </button>
          <button
            type="submit"
            onClick={() => setView("signin")}
            className={classes["btn__secondary-outlined"]}
          >
            Sign Up
          </button>
        </div>
      </motion.form>
    ),
  };

  return (
    <motion.div
      initial="hidden"
      animate={view.speed}
      exit="exit"
      className={classes.container}
    >
      <div className={classes.content}>
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 3,
            duration: 5,
            type: "spring",
            when: "beforeChildren",
          }}
          className={classes["logo-box"]}
        >
          <AnimatedLogo className={classes["logo"]} />
        </motion.div>
        <AnimatePresence mode="wait">{content[view.name]}</AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Root;
