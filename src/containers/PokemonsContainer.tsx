import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonsLayout from "../layouts/PokemonsLayout/PokemonsLayout";
import { API_ROUTES } from "../shared/constants/api_routes";
import { INITIAL_POKEMON } from "../shared/constants/inital_pokemon";
import { ActionTypeEnum } from "../shared/enums/action_type";
import { Pokemon } from "../shared/interfaces/Pokemon.interfaces";

const columns: string[] = ["Nombre", "Imagen", "Ataque", "Defensa", "Acciones"];

export default function PokemonsContainer () {
  const [rows, setRows] = useState<Pokemon []>([]);
  const [originalRows, setOriginalRows] = useState<Pokemon []>([]);
  const [pokemon, setPokemon] = useState<Pokemon>(INITIAL_POKEMON);
  const [disabledSubmit, setDisableSubmit] = useState<boolean>(true);
  const [actionType, setActionType] = useState<ActionTypeEnum>(ActionTypeEnum.ADD);
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [showEditSection, setShowEditSection] = useState<boolean>(false);

  const getPokemonsAPI = () => {
    return new Promise((resolve, reject) => {
      axios.get(API_ROUTES.GET_POST_POKEMON)
      .then(({ data }) => {
        setRows(data);
        setOriginalRows(data);
        resolve(data);
      })
    })
  }

  const filterData = (search: string) => {
    const newRows = originalRows.filter((pokemon) => pokemon.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
    setRows(newRows);
  }

  useEffect(() => {
    getPokemonsAPI();
  }, []);

  useEffect(() => {
    filterData(currentSearch);
  }, [originalRows])

  const onClickDelete = (id: number) => {
    axios.delete(`/${id}`)
    .then(() => {
      getPokemonsAPI();
    })
  }

  const onClickEdit = (pokemon: Pokemon) => {
    setActionType(ActionTypeEnum.UPDATE);
    setDisableSubmit(false);
    setPokemon(pokemon);
    setShowEditSection(true);
  }

  const onClickImage = (url: string) => {
    window.open(url, "_blank");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.name;
    let value: string = event.target.value;

    if ((name === "name" || name === "image") && (!value)) {
      setDisableSubmit(true);
    } else if (name === "name" && value && pokemon.image) {
      setDisableSubmit(false);
    } else if (name === "image" && value && pokemon.name) {
      setDisableSubmit(false);
    }

    setPokemon({ ...pokemon, [name]: name === "attack" || name === "defense" ? parseInt(value) : value });
  }

  const handleSubmit = (pokemon: Pokemon) => {
    if (actionType === ActionTypeEnum.ADD) {
      axios.post(API_ROUTES.GET_POST_POKEMON, pokemon)
      .then(() => {
        getPokemonsAPI()
        .then(() => {
          setPokemon(INITIAL_POKEMON);
        });
      });
    } else {
      axios.put(`/${pokemon.id}`, pokemon)
      .then(() => {
        getPokemonsAPI()
        .then(() => {
          setPokemon(INITIAL_POKEMON);
        });
      })
    }
    setActionType(ActionTypeEnum.ADD)
  }

  const handleSearchPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search: string = event.target.value;
    filterData(search);
    setCurrentSearch(search);
  }

  const handleCancel = () => {
    setActionType(ActionTypeEnum.ADD);
    setPokemon(INITIAL_POKEMON);
    setDisableSubmit(true);
    setShowEditSection(false);
  }

  const handleClickAddPokemon = () => {
    setShowEditSection(true);
  }

  return (
    <PokemonsLayout
      rows={rows}
      columns={columns}
      onClickDelete={onClickDelete}
      onClickEdit={onClickEdit}
      onClickImage={onClickImage}
      handleChange={handleChange}
      handleSearchPokemon={handleSearchPokemon}
      disabledSubmit={disabledSubmit}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      actionType={actionType}
      pokemon={pokemon}
      showEditSection={showEditSection}
      handleClickAddPokemon={handleClickAddPokemon}
    />
  );
}