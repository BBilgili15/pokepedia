import React from 'react'


const SelectedPokemon = ({selectedPokemonData}) => {

  const allTypes = selectedPokemonData.data.pokemon.types.map((type) => {
    return (
      <li>{type.type.name}</li>
    )
  })

  return (
    <ul>
      {allTypes}
    </ul>
  );
}

export default SelectedPokemon