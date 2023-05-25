import React from 'react'


const Pokedex = ({handleClick, pokemon, myParty}) => {

  const pokemonNames = pokemon.map((pokemon, index) => {
    return (
    <li key={index} className='pokemon-card' >
      <img src={pokemon.image}/>
      <h3>{pokemon.name}</h3>
      <button className={myParty.includes(pokemon) ? 'remove-from-party' : 'add-to-party'} onClick={() => {handleClick(pokemon)}} >+</button>
    </li>
    )

  })

  return (
    <div>
      <h2 className='pokedex-head'>Pokedex</h2>
      <h4 className='pokedex-head'>Current Party: {myParty.length}/6</h4>
      <ul className='pokemon-card-container'>
        {pokemonNames}
      </ul>
    </div>
  );
}

export default Pokedex