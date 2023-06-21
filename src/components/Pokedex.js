import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse } from 'antd'
import { all } from 'axios';

const { Panel } = Collapse;

const Pokedex = ({handleAddToParty, handleRemoveFromParty, pokemonData, filteredPokemon, myParty, handleSearch, setMyParty, setFilteredPokemon, setTypeForFilter, typeForFilter}) => {

    // Function to filter by type 
    const filterByType = (event) => {
      setTypeForFilter(event.target.innerText.toLowerCase())
      const filteredValues = pokemonData.filter((pokemon) => {
        const allTypes = pokemon.types.map((type) => {
          return type.type.name;
        })
        return allTypes.includes(typeForFilter) 
      })
      setFilteredPokemon(filteredValues)
    }

  const pokemonNames = filteredPokemon.map((pokemon, index) => {
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
    <div className='pokedex-container'>
      <h2 className='pokedex-head'>Pokedex</h2>
      {/* <div>
          <button onClick={() => {console.log(pokemonData)}}>Console Log Data</button>
          <button onClick={() => {console.log(myParty)}}>Console Log My Party</button>
      </div> */}
      
      
      <h4 className='pokedex-head'>Current Party: {myParty.length}/6</h4>


      <div className='pokemon-types-clear'>
       {/* Below UL should have 6 white circles that fill in as you add to your team.  */}
        <ul className='pokemon-types-container'>
          {myParty.map((pokemon) => {
            return(
              <li className={`type-${pokemon.typesData[0].name}`} id='pokemon-type-list-item'></li>
              )
          })}
        </ul>
        <button id="nav-item" onClick={() => {
          setMyParty([])
        }}>Clear Party</button>
      </div>






      <input type='text' className='input-search' placeholder='Search Pokemon..' onInput={handleSearch}/>
      <Collapse className='collapse'>
      <Panel header='Filters' key="1" className='panel'>
      <li className='type-clear' id="dropdown-type-filter" onClick={() => {setFilteredPokemon(pokemonData)}}>Clear Filter</li>
        <ul className='dropdown-type-container'>
          <li className='type-fire' id="dropdown-type-filter" onClick={filterByType}>Fire</li>
          <li className='type-water' id="dropdown-type-filter" onClick={filterByType}>Water</li>
          <li className='type-grass' id="dropdown-type-filter" onClick={filterByType}>Grass</li>
          <li className='type-bug' id="dropdown-type-filter" onClick={filterByType}>Bug</li>
          <li className='type-flying' id="dropdown-type-filter" onClick={filterByType}>Flying</li>
          <li className='type-normal' id="dropdown-type-filter" onClick={filterByType}>Normal</li>
          <li className='type-ice' id="dropdown-type-filter" onClick={filterByType}>Ice</li>
          <li className='type-poison' id="dropdown-type-filter" onClick={filterByType}>Poison</li>
          <li className='type-steel' id="dropdown-type-filter" onClick={filterByType}>Steel</li>
          <li className='type-ground' id="dropdown-type-filter" onClick={filterByType}>Ground</li>
          <li className='type-rock' id="dropdown-type-filter" onClick={filterByType}>Rock</li>
          <li className='type-psychic' id="dropdown-type-filter" onClick={filterByType}>Psychic</li>
          <li className='type-ghost' id="dropdown-type-filter" onClick={filterByType}>Ghost</li>
          <li className='type-dark' id="dropdown-type-filter" onClick={filterByType}>Dark</li>
          <li className='type-fairy' id="dropdown-type-filter" onClick={filterByType}>Fairy</li>
          <li className='type-electric' id="dropdown-type-filter" onClick={filterByType}>Electric</li>
          <li className='type-dragon' id="dropdown-type-filter" onClick={filterByType}>Dragon</li>
          <li className='type-fighting' id="dropdown-type-filter" onClick={filterByType}>Fighting</li>
        </ul>
      </Panel>
    </Collapse>

      <ul className='pokemon-card-container'>
        {pokemonNames}
      </ul>
    </div>
  );
}

export default Pokedex