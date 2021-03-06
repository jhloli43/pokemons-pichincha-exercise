import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import Table from "../../components/Table/Table";
import NewPokemon from "./NewPokemon/NewPokemon";
import { PokemonsLayoutProps } from "./PokemonsLayout.interfaces";
import { pokemonsLayoutStyles } from "./PokemonsLayout.styles";

export default function PokemonsLayout (props: PokemonsLayoutProps) {
  const {
    columns,
    onClickDelete,
    onClickEdit,
    onClickImage,
    rows,
    handleChange,
    handleSearchPokemon,
    disabledSubmit,
    handleCancel,
    handleSubmit,
    actionType,
    pokemon,
    showEditSection,
    handleClickAddPokemon,
  } = props;

  return (
    <div data-testid="pokemons-layout" style={pokemonsLayoutStyles.container}>
      <span style={pokemonsLayoutStyles.title}>Listado de pokemon</span>
      <div style={pokemonsLayoutStyles.searchContainer}>
        <InputField
          data-testid="input-search"
          icon="fa-solid fa-magnifying-glass fa-lg fa-fw"
          type="text"
          placeholder="Buscar"
          onChange={handleSearchPokemon}
        />
        <Button
          data-testid="btn-new"
          icon="fa-solid fa-plus"
          text="Nuevo"
          onClick={handleClickAddPokemon}
        />
      </div>
      <Table
        data-testid="table-pokemons"
        rows={rows}
        columns={columns}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        onClickImage={onClickImage}
        style={pokemonsLayoutStyles.table}
      />
      {showEditSection && (
        <NewPokemon
          handleChange={handleChange}
          disabledSubmit={disabledSubmit}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          pokemon={pokemon}
          actionType={actionType}
        />
      )}
    </div>
  )
}