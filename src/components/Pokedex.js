import React from 'react'
import { Link } from 'react-router-dom'


const Pokedex = ({handleAddToParty, handleRemoveFromParty, pokemonData, filteredPokemon, myParty, handleSearch, imageClick, selectedPokemonData, getPokemonWithData}) => {

  const pokemonNames = pokemonData.map((pokemon, index) => {
    return (
    <li key={pokemon.name} className='pokemon-card'>
          <ul className='pokemon-card-type-container'>
        {pokemon.types.map((type) => (
          <li id='pokemon-card-type-list-item' className={`type-${type.type.name}`}>{type.type.name}</li>
        ))}
      </ul>
        <img src={pokemon.sprites.front_default} className='pokemon-card-image'/>
        <h3 className='pokemon-card-name'>{pokemon.name}</h3>
      {myParty.includes(pokemon) ? <button className='remove-from-party' onClick={() => {handleRemoveFromParty(pokemon)}}>Remove From Party</button> : <button className='add-to-party' onClick={() => {handleAddToParty(pokemon)}}>Add To Party</button>}
    </li>
    )

  })

  return (
    <div>
      <h2 className='pokedex-head'>Pokedex</h2>
      <div>
          <button onClick={() => {console.log(pokemonData)}}>Console Log Data</button>
          <button onClick={() => {console.log(myParty)}}>Console Log My Party</button>
      </div>
      <input type='text' className='input-search' placeholder='Search Pokemon..' onInput={handleSearch}/>
      <h4 className='pokedex-head'>Current Party: {myParty.length}/6</h4>
      <ul className='pokemon-types-container'>
        {myParty.map((pokemon) => {
          return(
            <li className={`type-${pokemon.typesData[0].name}`} id='pokemon-type-list-item'></li>
            )
        })}
      </ul>
      <ul className='pokemon-card-container'>
        {pokemonNames}
      </ul>
    </div>
  );
}

export default Pokedex