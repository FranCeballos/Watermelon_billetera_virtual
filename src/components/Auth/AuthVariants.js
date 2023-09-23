export const buttonsVariant = {
  hidden: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { delay: 0.5, duration: 2, type: "spring" },
  },
  exit: {
    opacity: 0,
    transition: { opacity: { duration: 5, type: "spring" } },
  },
};

export const authVariant = {
  hidden: {
    opacity: 0,
  },
  animate: { opacity: 1, transition: { duration: 2, type: "spring" } },
  exit: {
    opacity: 0,
    transition: { opacity: { duration: 5, type: "spring" } },
  },
};

export const loaderVariant = {
  hidden: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 1,
        delay: 3,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: {
        duration: 1,
      },
    },
  },
};
