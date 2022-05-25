import React from "react";
import { ActionTypeEnum } from "../../shared/enums/action_type";
import { Pokemon } from "../../shared/interfaces/Pokemon.interfaces";

export interface PokemonsLayoutProps {
  rows: Pokemon[];
  columns: string[];
  onClickEdit: (pokemon: Pokemon) => void;
  onClickDelete: (id: number) => void;
  onClickImage: (url: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchPokemon: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabledSubmit: boolean;
  handleSubmit: (pokemon: Pokemon) => void;
  handleCancel: () => void;
  actionType: ActionTypeEnum;
  pokemon: Pokemon;
  showEditSection: boolean;
  handleClickAddPokemon: () => void;
}