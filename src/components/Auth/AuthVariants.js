export const buttonsVariant = {
  hidden: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 4.5, duration: 1, type: "spring" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 5, type: "spring" },
  },
};

export const authVariant = {
  hidden: {
    opacity: 0,
  },
  animate: { opacity: 1, transition: { duration: 2, type: "spring" } },
  exit: {
    opacity: 0,
    transition: { duration: 5, type: "spring" },
  },
};
