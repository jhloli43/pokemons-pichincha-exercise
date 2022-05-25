import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon?: string;
  text: string;
  color?: string;
  backgroundColor?: string;
}