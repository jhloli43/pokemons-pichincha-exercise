import React from "react";

export const newPokemonStyles: Record<string, React.CSSProperties> = {
  newPokemonContainer: {
    padding: "20px 10px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    borderRadius: "5px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "18px",
  },
  input: {
    marginLeft: "5px",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  sectionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  saveButton: {
    marginRight: "10px",
  },
}