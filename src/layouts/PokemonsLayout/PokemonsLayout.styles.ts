import React from "react";

export const pokemonsLayoutStyles: Record<string, React.CSSProperties> = {
  container: {
    margin: "20px 40px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#293637",
    fontSize: "18px",
    fontWeight: 600,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
    marginBottom: "20px",
  },
  table: {
    marginBottom: "20px",
  }
}