import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./Auth.module.css";
import AnimatedLogo from "../UI/Logos/AnimatedLogo";
import AuthSelector from "./AuthSelector";
import AuthForm from "./AuthForm";
import AuthSuccess from "./AuthSuccess";

const AuthContainer = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const isLogin = searchParams.get("mode") === "login";
  const isSuccess = searchParams.get("mode") === "success";

  return (
    <motion.div
      initial="hidden"
      animate="animate"
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
        <AnimatePresence mode="wait">
          {!isLogin && !isSignup && !isSuccess && <AuthSelector />}
          {(isLogin || isSignup) && <AuthForm isLogin={isLogin} />}
          {isSuccess && <AuthSuccess />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AuthContainer;
