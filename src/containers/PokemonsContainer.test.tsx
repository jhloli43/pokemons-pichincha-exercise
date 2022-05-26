import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import PokemonsContainer from "./PokemonsContainer";
import axios from "axios";
import { POKEMONS_TEST } from "../shared/constants/pokemons_test";
import { act } from "react-dom/test-utils";
import { Pokemon } from "../shared/interfaces/Pokemon.interfaces";

jest.mock("axios");

const axiosMockGet = (pokemons: Pokemon[]) => {
  jest.spyOn(axios, "get").mockResolvedValue({
    data: pokemons
  });
}

const axiosMockPost = () => {
  jest.spyOn(axios, "post").mockResolvedValue("Success");
}

const axiosMockPut = () => {
  jest.spyOn(axios, "put").mockResolvedValue("Success");
}

const axiosMockDelete = () => {
  jest.spyOn(axios, "delete").mockResolvedValue("Success");
}

describe("PokemonsContainer", () => {
  beforeEach(() => {
    axiosMockGet(POKEMONS_TEST);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("when call PokemonsContainer, show PokemonsLayout", async () => {
    act(() => {
      render(<PokemonsContainer />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("pokemons-layout")).toBeInTheDocument();
      expect(screen.getByTestId("input-search")).toBeInTheDocument();
      expect(screen.getByTestId("btn-new")).toBeInTheDocument();
      expect(screen.getByTestId("table-pokemons")).toBeInTheDocument();
      expect(screen.queryByTestId("new-pokemon-section")).not.toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(POKEMONS_TEST.length + 1);
    });
  });

  it("when click add button, show NewPokemon section with save button disabled", async () => {
    act(() => {
      render(<PokemonsContainer />);
    });

    fireEvent.click(screen.getByTestId("btn-new"));

    await waitFor(() => {
      expect(screen.getByTestId("new-pokemon-section")).toBeInTheDocument();
      expect(screen.getByTestId("btn-save")).toBeDisabled();
      expect(screen.getByText(/nuevo pokemon/i)).toBeInTheDocument();
    });
  });

  it("when click add button and input all data, then click save button, it'll create a new pokemon", async () => {
    const newPokemon: Pokemon = {
      attack: 80,
      defense: 80,
      image: "some URL",
      name: "Test pokemon",
    };

    axiosMockPost();
    axiosMockGet([...POKEMONS_TEST, newPokemon]);

    act(() => {
      render(<PokemonsContainer />);
    });

    fireEvent.click(screen.getByTestId("btn-new"));
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: newPokemon.name } });
    fireEvent.change(screen.getByLabelText(/imagen/i), { target: { value: newPokemon.image } });
    fireEvent.change(screen.getByLabelText(/ataque/i), { target: { value: `${newPokemon.attack}` } });
    fireEvent.change(screen.getByLabelText(/defensa/i), { target: { value: `${newPokemon.defense}` } });
    fireEvent.click(screen.getByTestId("btn-save"));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(screen.getAllByRole("row")).toHaveLength(POKEMONS_TEST.length + 2);
    });
  });

  it("when click add button and input some data, then click cancel button, the submit button may be disabled", async () => {
    const newPokemon: Pokemon = {
      attack: 80,
      defense: 80,
      image: "Some URL",
      name: "Test pokemon",
    };

    act(() => {
      render(<PokemonsContainer />);
    });

    fireEvent.click(screen.getByTestId("btn-new"));
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: newPokemon.name } });
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/imagen/i), { target: { value: newPokemon.image } });
    fireEvent.change(screen.getByLabelText(/ataque/i), { target: { value: `${newPokemon.attack}` } });
    fireEvent.change(screen.getByLabelText(/defensa/i), { target: { value: `${newPokemon.defense}` } });
    fireEvent.click(screen.getByTestId("btn-cancel"));
    
    await waitFor(() => {
      expect(screen.queryByTestId("new-pokemon-section")).not.toBeInTheDocument();
    });
  });

  it("when click an edit button of a row and change some inputs, then click save button, it'll update the selected pokemon", async () => {
    const updatePokemon: Pokemon = {
      attack: 20,
      defense: 50,
      image: "Updated image",
      name: "Updated name",
    };

    const index = 1;
    const finalList = [
      ...POKEMONS_TEST.slice(0, index),
      updatePokemon,
      ...POKEMONS_TEST.slice(index + 1),
    ];

    axiosMockPut();
    axiosMockGet(finalList);

    act(() => {
      render(<PokemonsContainer />);
    });

    await waitFor(async () => {
      const row = within(screen.getAllByRole("row")[index]);
      fireEvent.click(row.getByTestId("icon-edit"));
      fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: updatePokemon.name } });
      fireEvent.change(screen.getByLabelText(/imagen/i), { target: { value: updatePokemon.image } });
      fireEvent.change(screen.getByLabelText(/ataque/i), { target: { value: `${updatePokemon.attack}` } });
      fireEvent.change(screen.getByLabelText(/defensa/i), { target: { value: `${updatePokemon.defense}` } });
      fireEvent.click(screen.getByTestId("btn-save"));

      await waitFor(() => {
        expect(axios.put).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(screen.getAllByRole("row")).toHaveLength(finalList.length + 1);
      });
    });
  });

  it("when click an delete button of a row, it'll delete the selected pokemon", async () => {
    const index = 1;
    const finalList = [
      ...POKEMONS_TEST.slice(0, index),
      ...POKEMONS_TEST.slice(index + 1),
    ];

    axiosMockDelete();
    axiosMockGet(finalList);

    act(() => {
      render(<PokemonsContainer />);
    });

    await waitFor(async () => {
      const row = within(screen.getAllByRole("row")[index]);
      fireEvent.click(row.getByTestId("icon-delete"));

      await waitFor(() => {
        expect(axios.delete).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(screen.getAllByRole("row")).toHaveLength(finalList.length + 1);
      });
    });
  });

  it("when click an image button of a row, it'll open a new tab to show image", async () => {
    const index = 1;

    window.open = jest.fn();

    act(() => {
      render(<PokemonsContainer />);
    });

    await waitFor(async () => {
      const row = within(screen.getAllByRole("row")[index]);
      fireEvent.click(row.getByTestId("icon-image"));

      await waitFor(() => {
        expect(window.open).toHaveBeenCalled();
      });
    });
  });

  it("when input a pokemon in the searchbox, it'll filter the list with the name", async () => {
    act(() => {
      render(<PokemonsContainer />);
    });

    fireEvent.change(screen.getByTestId("input-search"), { target: { value: "Charizard" } });

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });
  });
});