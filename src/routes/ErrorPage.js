import { useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";
import AnimatedLogo from "../components/UI/Logos/AnimatedLogo";
import { motion } from "framer-motion";

const variantError = {
  hidden: {
    opacity: 0,
    y: "20px",
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className={classes.container}>
      <AnimatedLogo className={classes.logo} />
      <motion.p
        variants={variantError}
        initial="hidden"
        animate="show"
        transition={{
          delay: 1,
          duration: 1,
          type: "spring",
        }}
        className={classes.title}
      >
        Unexpected Application Error!
      </motion.p>
      <motion.p
        variants={variantError}
        initial="hidden"
        animate="show"
        transition={{
          delay: 1.1,
          duration: 1,
          type: "spring",
        }}
        className={classes.error}
      >
        {error.statusText.toUpperCase() || error.message}
      </motion.p>
    </div>
  );
};

export default ErrorPage;
