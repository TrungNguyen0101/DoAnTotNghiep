import React from "react";
import "./input.css";
import { useController } from "react-hook-form";

const Input = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({ name, control, defaultValue: "" });

  return (
    <input
      placeholder="Enter text"
      class={`input1 ${className}`}
      type={props.type}
      {...field}
      {...props}
    />
  );
};

export default Input;
