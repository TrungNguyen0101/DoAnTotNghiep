import React from "react";
import "./styled.css";
const ButtonCustom = ({
  text,
  onClick,
  className,
  className1,
  typeCustom,
  type,
}) => {
  return (
    <>
      {typeCustom === "submit" ? (
        <button class={`${className} button_submit`} type={type}>
          <span class="text">{text}</span>
        </button>
      ) : (
        <button className={`${className} button_custom`} onClick={onClick}>
          <span className={className1}>{text}</span>
        </button>
      )}
    </>
  );
};

export default ButtonCustom;
