import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./Auth.module.css";
import AnimatedLogo from "../UI/Logos/AnimatedLogo";
import AuthSelector from "./AuthSelector";
import Login from "./Login";
import Signup from "./Signup";

const AuthContainer = () => {
  const [view, setView] = useState({ name: "selector", speed: "slow" });

  const content = {
    selector: <AuthSelector onNavigation={(view) => setView(view)} />,
    login: <Login onNavigation={(view) => setView(view)} />,
    signup: <Signup onNavigation={(view) => setView(view)} />,
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

export default AuthContainer;
