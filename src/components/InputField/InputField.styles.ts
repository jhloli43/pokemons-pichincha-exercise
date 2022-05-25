import React from "react";

export const inputFieldStyles: Record<string, React.CSSProperties> = {
  input: {
    padding: "10px 10px",
    margin: "4px",
    boxSizing: "border-box",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid",
   },
  divIcon: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 0,
    top: "13px",
    padding: "10px 15px",
  }
}