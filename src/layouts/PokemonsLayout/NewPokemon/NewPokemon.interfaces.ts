import React from "react";
import { ActionTypeEnum } from "../../../shared/enums/action_type";
import { Pokemon } from "../../../shared/interfaces/Pokemon.interfaces";

export interface NewPokemonProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabledSubmit: boolean;
  handleSubmit: (pokemon: Pokemon) => void;
  handleCancel: () => void;
  actionType: ActionTypeEnum;
  pokemon: Pokemon;
}