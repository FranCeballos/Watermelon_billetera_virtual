export const buttonsVariant = {
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

export const signinVariant = {
  hidden: {
    opacity: 0,
  },
  fast: { opacity: 1, transition: { duration: 1, type: "spring" } },
  exit: {
    opacity: 0,
    transition: { duration: 5, type: "spring" },
  },
};
