import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./Auth.module.css";
import AnimatedLogo from "../UI/Logos/AnimatedLogo";
import AuthSelector from "./AuthSelector";
import AuthForm from "./AuthForm";
import AuthSuccess from "./AuthSuccess";

import LoadingIcon from "./LoadingIcon";
import { loaderVariant } from "./AuthVariants";
import { useLazyGetWakeupQuery } from "../../services/authService";
import FooterApp from "../Footer/FooterApp";

const AuthContainer = () => {
  const [trigger, result] = useLazyGetWakeupQuery();
  const [isAwake, setIsAwake] = useState(false);
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const isLogin = searchParams.get("mode") === "login";
  const isSuccess = searchParams.get("mode") === "success";
  const { isLoading, isSuccess: isSuccessResult } = result;

  useEffect(() => {
    if (!isAwake) {
      trigger();
    }
    if (isSuccessResult) {
      setIsAwake(true);
    }
  }, [trigger, isSuccessResult, isAwake]);

  console.log(result);

  return (
    <motion.div
      initial="hidden"
      animate="animate"
      exit="exit"
      className={classes.container}
    >
      <div className={classes["content__container"]}>
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
          {isLoading && (
            <motion.div
              key="loader"
              className={classes.loader}
              variants={loaderVariant}
              initial="hidden"
              animate="animate"
              exit="exit"
            >
              <p className={classes["loader__text"]}>Waking up server...</p>
              <LoadingIcon />
            </motion.div>
          )}

          {!isLogin && !isSignup && !isSuccess && !isLoading && isAwake && (
            <AuthSelector />
          )}
          {(isLogin || isSignup) && !isLoading && isAwake && (
            <AuthForm isLogin={isLogin} />
          )}
          {isSuccess && !isLoading && isAwake && <AuthSuccess />}
        </AnimatePresence>
      </div>
      <FooterApp
        style={{ position: "absolute", bottom: "0" }}
        showLogo={false}
      />
    </motion.div>
  );
};

export default AuthContainer;
