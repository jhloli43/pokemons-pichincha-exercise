import React from "react";
import { Pokemon } from "../../shared/interfaces/Pokemon.interfaces";

export interface TableProps extends React.ComponentPropsWithoutRef<"table"> {
  rows: Pokemon[];
  columns: string[];
  onClickEdit: (pokemon: Pokemon) => void;
  onClickDelete: (id: number) => void;
  onClickImage: (url: string) => void;
}