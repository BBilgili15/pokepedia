import React from 'react'


const TeamBuilder = ({myParty, removeFromParty}) => {


  const renderMyParty = myParty.map((pokemon, index) => {
    return (
      <li key={index} className='pokemon-team-card' >
        <img src={pokemon.image}/>
        <h3>{pokemon.name}</h3>
        <button className='add-to-party'>-</button>
       </li>
    )
  })

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