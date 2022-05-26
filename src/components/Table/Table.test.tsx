import "@testing-library/jest-dom";
import { fireEvent, render, within } from "@testing-library/react";
import { POKEMONS_TEST } from "../../shared/constants/pokemons_test";
import Table from "./Table";
import { TableProps } from "./Table.interfaces";

describe("Table component", () => {
  const onClickDelete = jest.fn();
  const onClickEdit = jest.fn();
  const onClickImage = jest.fn();

  const props: TableProps = {
    columns: ["Nombre", "Imagen", "Ataque", "Defensa", "Acciones"],
    rows: POKEMONS_TEST,
    onClickDelete,
    onClickEdit,
    onClickImage
  };

  it("when call Table component, show all rows", () => {
    const { getAllByRole } = render(<Table {...props} />);

    expect(getAllByRole("row")).toHaveLength(POKEMONS_TEST.length + 1);
  });

  it("when click on the image icon of a row, call onClickImage", () => {
    const { getAllByRole } = render(<Table {...props} />);
    const row = within(getAllByRole("row")[1]);
    
    fireEvent.click(row.getByTestId("icon-image"));

    expect(onClickImage).toHaveBeenCalled();
  });

  it("when click on the edit icon of a row, call onClickEdit", () => {
    const { getAllByRole } = render(<Table {...props} />);
    const row = within(getAllByRole("row")[1]);
    
    fireEvent.click(row.getByTestId("icon-edit"));

    expect(onClickEdit).toHaveBeenCalled();
  });

  it("when click on the delete icon of a row, call onClickDelete", () => {
    const { getAllByRole } = render(<Table {...props} />);
    const row = within(getAllByRole("row")[1]);
    
    fireEvent.click(row.getByTestId("icon-delete"));

    expect(onClickDelete).toHaveBeenCalled();
  });
});