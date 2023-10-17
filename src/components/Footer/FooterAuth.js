import React from "react";
import { motion } from "framer-motion";
import classes from "./FooterAuth.module.css";

const FooterAuth = ({ style = {}, showLogo = true }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      style={style}
      className={classes.container}
    >
      <div className={classes.left}>
        <p className={classes.text}>Developed by Francisco Ceballos</p>
      </div>
      <div className={classes.center}>
        {showLogo && (
          <img
            className={classes["logo__watermelon"]}
            src="/assets/watermelon-clear.png"
            alt="Watermelon App Logo"
          />
        )}
      </div>
      <div className={classes.right}>
        <a
          href="https://github.com/FranCeballos/watermelon-wallet-front.git"
          target="_blank"
          rel="noreferrer"
          className={classes["logo__container-github"]}
        >
          <img
            className={classes["logo__github"]}
            src="/assets/github.png"
            alt="GitHub Logo"
          />
        </a>
      </div>
    </motion.footer>
  );
};

export default FooterAuth;
