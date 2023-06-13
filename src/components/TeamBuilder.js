import React from 'react'


const TeamBuilder = ({myParty, pokemonData}) => {


  const renderMyParty = myParty.map((pokemon, index) => {
    return (
      <li key={index} className='pokemon-team-card' >
        <img src={pokemon.sprites.front_default}/>
        <h3>{pokemon.name}</h3>
       </li>
    )
  })

  // make an array of everything this team is weak against (eg
  // [fire, fire, grass, water, fire etc etc])
  // Make some assumpions based on how many of each. If there is 3x of one - you are very weak against
  // if there is none of one - you are safe against xxx
  // do the same for strengths
  return (
    <div>
    <h2 className='pokemon-team-subheading'>Build Your Team</h2>
      <ul className='pokemon-team-container'>
        {renderMyParty}
      </ul>
    </div>
  );
}

export default TeamBuilder