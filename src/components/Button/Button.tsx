import React from "react";
import { ButtonProps } from "./Button.interfaces";
import { buttonStyles } from "./Button.styles";

export default function Button (props: ButtonProps) {
  const {
    icon,
    text,
    backgroundColor = "#6658F6",
    color = "white",
    style,
    disabled,
    ...rest
  } = props;

  const customStyle: React.CSSProperties = {...buttonStyles, ...style, backgroundColor, color, opacity: disabled? 0.5: 1 };

  return (
    <button
      className="button"
      style={customStyle}
      disabled={disabled}
      {...rest}
    >
      {icon && <i className={icon}></i>}
      <span style={{ marginLeft: icon? "10px" : "0px" }}>
        {text}
      </span>
    </button>
  )
}