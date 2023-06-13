import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonList = ({handleAddToParty, handleRemoveFromParty, pokemon, filteredPokemon, myParty, handleSearch, pokemonData, selectedPokemonData, getPokemonWithDat}) => {
  // const [pokemonData, setPokemonData] = useState([]);



  return (
    <div>
      <h1>Pokemon List</h1>
      <button onClick={() => {console.log(pokemonData)}}>Data</button>
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>Abilities:</h3>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
          <h3>Moves:</h3>
          <ul>
            {pokemon.moves.map((move) => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
          <h3>Types:</h3>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
