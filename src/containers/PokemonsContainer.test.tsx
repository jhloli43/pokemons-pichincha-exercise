import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PokemonsContainer from "./PokemonsContainer";
import axios from "axios";
import { POKEMONS_TEST } from "../shared/constants/pokemons_test";

jest.mock("axios");

describe("PokemonsContainer", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: POKEMONS_TEST
    });
  });

  it("when call PokemonsContainer, show PokemonsLayout", () => {
    render(<PokemonsContainer />);

    expect(screen.getByTestId("pokemons-layout")).toBeInTheDocument();
    expect(screen.getByTestId("input-search")).toBeInTheDocument();
    expect(screen.getByTestId("btn-new")).toBeInTheDocument();
    expect(screen.getByTestId("table-pokemons")).toBeInTheDocument();
    expect(screen.queryByTestId("new-pokemon-section")).not.toBeInTheDocument();
  });

  it("when click add button, show NewPokemon section", () => {
    render(<PokemonsContainer />);
    fireEvent.click(screen.getByTestId("btn-new"));
    expect(screen.getByTestId("new-pokemon-section")).toBeInTheDocument();
  });

  it("when click an edit button from the table, show NewPokemon section with title 'Editar pokemon", () => {
    render(<PokemonsContainer />);
  });
});