import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'antd'

const { Panel } = Collapse;

const Pokedex = ({handleAddToParty, handleRemoveFromParty, pokemonData, filteredPokemon, myParty, handleSearch, setMyParty}) => {

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
      <Collapse className='collapse'>
      <Panel header='Filters' key="1" className='panel'>
        <ul className='dropdown-type-container'>
          <li className='type-fire' id="dropdown-type-filter">Fire</li>
          <li className='type-water' id="dropdown-type-filter">Water</li>
          <li className='type-grass' id="dropdown-type-filter">Grass</li>
          <li className='type-bug' id="dropdown-type-filter">Bug</li>
          <li className='type-flying' id="dropdown-type-filter">Flying</li>
          <li className='type-normal' id="dropdown-type-filter">Normal</li>
          <li className='type-ice' id="dropdown-type-filter">Ice</li>
          <li className='type-poison' id="dropdown-type-filter">Poison</li>
          <li className='type-steel' id="dropdown-type-filter">Steel</li>
          <li className='type-ground' id="dropdown-type-filter">Ground</li>
          <li className='type-rock' id="dropdown-type-filter">Rock</li>
          <li className='type-psychic' id="dropdown-type-filter">Psychic</li>
          <li className='type-ghost' id="dropdown-type-filter">Ghost</li>
          <li className='type-fairy' id="dropdown-type-filter">Fairy</li>
          <li className='type-electric' id="dropdown-type-filter">Electric</li>
          <li className='type-dragon' id="dropdown-type-filter">Dragon</li>
        </ul>
      </Panel>
    </Collapse>
      <input type='text' className='input-search' placeholder='Search Pokemon..' onInput={handleSearch}/>
      <h4 className='pokedex-head'>Current Party: {myParty.length}/6</h4>
      <button onClick={() => {
        setMyParty([])
      }}>Clear Party</button>
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