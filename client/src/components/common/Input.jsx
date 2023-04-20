import React from "react";

const Input = ({
  type,
  name,
  value,
  placeholder,
  label,
  classname,
  onChange,
}) => {
  const classes = `${classname}`;
  return (
    <label>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classes}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
