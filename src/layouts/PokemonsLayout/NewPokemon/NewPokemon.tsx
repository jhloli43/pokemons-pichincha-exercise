import Button from "../../../components/Button/Button";
import InputField from "../../../components/InputField/InputField";
import { ActionTypeEnum } from "../../../shared/enums/action_type";
import { NewPokemonProps } from "./NewPokemon.interfaces";
import { newPokemonStyles } from "./NewPokemon.styles";

export default function NewPokemon (props: NewPokemonProps) {
  const { handleChange, disabledSubmit, actionType, handleCancel, handleSubmit, pokemon } = props;

  return (
    <div data-testid="new-pokemon-section" style={newPokemonStyles.newPokemonContainer}>
      <span style={newPokemonStyles.title}>{actionType === ActionTypeEnum.ADD ? "Nuevo pokemon" : "Editar pokemon"}</span>
      <div style={newPokemonStyles.section}>
        <label style={newPokemonStyles.label}>
          Nombre:
          <InputField
            name="name"
            placeholder="Nombre"
            style={newPokemonStyles.input}
            onChange={handleChange}
            value={pokemon.name}
          />
        </label>
        <label style={newPokemonStyles.label}>
          Ataque:
          <input
            name="attack"
            type="range"
            min="1"
            max="100"
            style={newPokemonStyles.input}
            onChange={handleChange}
            value={`${pokemon.attack}`}
          />
        </label>
      </div>
      <div style={newPokemonStyles.section}>
        <label style={newPokemonStyles.label}>
          Imagen:
          <InputField
            name="image"
            placeholder="url"
            style={newPokemonStyles.input}
            onChange={handleChange}
            value={pokemon.image}
          />
        </label>
        <label style={newPokemonStyles.label}>
          Defensa:
          <input
            name="defense"
            type="range"
            min="1"
            max="100"
            style={newPokemonStyles.input}
            onChange={handleChange}
            value={`${pokemon.defense}`}
          />
        </label>
      </div>
      <div style={newPokemonStyles.sectionButtons}>
        <Button
          icon="fa-solid fa-floppy-disk"
          text="Guardar"
          style={newPokemonStyles.saveButton}
          disabled={disabledSubmit}
          onClick={() => handleSubmit(pokemon)}
        />
        <Button
          icon="fa-solid fa-xmark"
          text="Cancelar"
          onClick={handleCancel}
        />
      </div>
    </div>
  )
}