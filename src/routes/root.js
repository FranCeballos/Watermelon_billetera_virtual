import { motion } from "framer-motion";
import classes from "./root.module.css";
import AnimatedLogo from "../components/UI/AnimatedLogo";

const buttonsVariant = {
  hidden: {
    opacity: 0,
  },
  show: { opacity: 1, transition: { delay: 4.5, duration: 1, type: "spring" } },
  exit: {},
};

const Root = () => {
  return (
    <motion.div initial="hidden" animate="show" className={classes.container}>
      <motion.div
        initial={{ scale: 1.5 }}
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
      <motion.div
        variants={buttonsVariant}
        className={classes["options-container"]}
      >
        <button className={classes["btn__primary"]}>Sign In</button>
        <button className={classes["btn__secondary"]}>Create account</button>
      </motion.div>
    </motion.div>
  );
};

export default Root;
