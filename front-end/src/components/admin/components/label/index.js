import React from "react";
import "./styled.css";

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
};

export default Label;
