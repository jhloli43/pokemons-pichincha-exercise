import React from "react";
import { InputFieldProps } from "./InputField.interfaces";
import { inputFieldStyles } from "./InputField.styles";

export default function InputField (props: InputFieldProps) {
  const { icon, style, ...rest } = props;
  const styleInput: React.CSSProperties = { ...inputFieldStyles.input, ...style, paddingLeft: icon ? "45px" : "10px" }

  return (
    <div style={inputFieldStyles.divIcon}>
      <input {...rest} style={styleInput} />
      {icon && <i className={icon} style={inputFieldStyles.icon}></i>}
    </div>
  );
}