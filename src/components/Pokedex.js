import React from 'react'


const Pokedex = ({handleAddToParty, handleRemoveFromParty, filteredPokemon, myParty, handleSearch}) => {

  const pokemonNames = filteredPokemon.map((pokemon, index) => {
    return (
    <li key={pokemon.name} className='pokemon-card' >
      {/* <div className='name-image-container'> */}
        <img src={pokemon.image} className='pokemon-card-image'/>
        <h3 className='pokemon-card-name'>{pokemon.name}</h3>
      {/* </div> */}
      {myParty.includes(pokemon) ? <button className='remove-from-party' onClick={() => {handleRemoveFromParty(pokemon)}}>Remove From Party</button> : <button className='add-to-party' onClick={() => {handleAddToParty(pokemon)}}>Add To Party</button>}
    </li>
    )

  })

  return (
    <div>
      <h2 className='pokedex-head'>Pokedex</h2>
      <input type='text' className='input-search' placeholder='Search Pokemon..' onInput={handleSearch}/>
      <h4 className='pokedex-head'>Current Party: {myParty.length}/6</h4>
      <ul className='pokemon-card-container'>
        {pokemonNames}
      </ul>
    </div>
  );
}

export default Pokedex