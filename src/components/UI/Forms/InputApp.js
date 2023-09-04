import { useState } from "react";
import classes from "./InputApp.module.css";

const InputApp = ({
  placeholder,
  onChange,
  type = "text",
  error = "",
  max = 1000000,
  min = 0,
}) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.container}>
      <input
        className={`${classes.input} ${
          error ? classes["input__error-border"] : ""
        }`}
        type={type}
        onChange={(value) => onChangeHandler(value.target.value)}
        value={value}
        max={max}
        min={min}
        placeholder={placeholder}
        onWheel={(e) => e.target.blur()}
      />
      <p className={classes.error}>{error}</p>
    </div>
  );
};

export default InputApp;
