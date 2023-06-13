import React from 'react'
import {useState} from 'react'


const TeamBuilder = ({myParty, pokemonData}) => {

  const [top3WeakAgainst, setTop3WeakAgainst] = useState(null)

  const renderMyParty = myParty.map((pokemon, index) => {
    return (
      <li key={index} className='pokemon-team-card' >
        <img src={pokemon.sprites.front_default}/>
        <h3>{pokemon.name}</h3>
       </li>
    )
  })




  // For each Pokemon in party, create a separate array of what they are weak against 
  const arraysOfWeakAgainst = myParty.map((pokemon) => {
    const arrays = pokemon.typesData.map((type) => {
      return type.weaknesses
    })
    return arrays
  })
  // Combine these arrays into one array
  const weakAgainstArrays = arraysOfWeakAgainst.flatMap((array) => array)
  const weakAgainst = weakAgainstArrays.flatMap((array) => array)
  const weakAgainstNames = weakAgainst.map((type) => {
    return type.name
  })

  // make an array of everything this team is weak against (eg
  // [fire, fire, grass, water, fire etc etc])
  // Make some assumpions based on how many of each. If there is 3x of one - you are very weak against
  // if there is none of one - you are safe against xxx
  // do the same for strengths

  // OR do a top 3 weaknesses and strengths
  // recommend a type/pokemon to fix problem

  const generateReport = (array) => {
    let count = {}
    for (let item of array) {
      if (count[item]) { 
        count[item]++
      } else {
        count[item] = 1
      }
    }
    console.log(count)
    return getTopOccurrences(count, 3)
  }

  function getTopOccurrences(occurrenceCount, topCount) {
    const sortedOccurrences = Object.entries(occurrenceCount).sort((a, b) => b[1] - a[1]);
    const topOccurrences = sortedOccurrences.slice(0, topCount);
  
    setTop3WeakAgainst(topOccurrences)
    console.log("Top 3 Weak Against:", top3WeakAgainst);
  }


  return (
    <div className='team-builder-container'>
      <div>
        <h2 className='pokemon-team-subheading'>Your Party</h2>
        <ul className='pokemon-team-container'>
            {renderMyParty}
          </ul>
      </div>
      <div>
        <button id='nav-item' onClick={() => {generateReport(weakAgainstNames)}}>Generate Weakness Report</button>
        <div>
        {top3WeakAgainst ? 
        <div className='weakness-report-container'>
          <p>You are weakest to: <span className={`type-${top3WeakAgainst[0][0]} weak-against`}>{top3WeakAgainst[0][0]}</span> with {top3WeakAgainst[0][1]} weaknesses identified</p>
          <p>You are second weakest to: <span className={`type-${top3WeakAgainst[1][0]} weak-against`}>{top3WeakAgainst[1][0]}</span> with {top3WeakAgainst[1][1]} weaknesses identified</p>
          <p>You are third weakest to: <span className={`type-${top3WeakAgainst[2][0]} weak-against`}>{top3WeakAgainst[2][0]}</span> with {top3WeakAgainst[2][1]} weaknesses identified</p>
        </div>
        : <></>}
        </div>
      </div>
    </div>
  );
}

export default TeamBuilder