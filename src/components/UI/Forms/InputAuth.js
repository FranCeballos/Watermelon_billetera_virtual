import { useState } from "react";
import classes from "./InputAuth.module.css";

const InputAuth = ({ placeholder, inputRef, type = "text", error = "" }) => {
  const [value, setValue] = useState("");

  return (
    <div className={classes.container}>
      <input
        ref={inputRef}
        className={`${classes.input} ${
          error ? classes["input__error-border"] : ""
        }`}
        type={type}
        onChange={(value) => setValue(value.target.value)}
        value={value}
        placeholder={placeholder}
        onWheel={(e) => e.target.blur()}
      />
      <p className={classes.error}>{error}</p>
    </div>
  );
};

export default InputAuth;
