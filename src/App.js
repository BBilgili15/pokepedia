import './App.css';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, useActionData} from "react-router-dom"
import NavBar from './components/NavBar';
import Pokedex from './components/Pokedex';
import ErrorPage from './components/ErrorPage';
import TeamBuilder from './components/TeamBuilder';

function App() {
  // Ignore Below
  const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        
      }
    }
  }`;

  const gqlVariables = {
    limit: 151,
    offset: 0,
  };


  // Don't Ignore Below

  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(pokemon)
  const [myParty, setMyParty] = useState([])

  useEffect(() => {
    getPokemon();
  }, [])

  const getPokemon = function(){
    fetch('https://graphql-pokeapi.graphcdn.app/', {
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: gqlQuery,
      variables: gqlVariables,
    }),
    method: 'POST',
})
    .then(res => res.json())
    .then(pokemon => setPokemon(pokemon.data.pokemons.results))
}





  console.log(pokemon)

  const selectParty = (pokemon) => {
    if (myParty.length < 6) {
      const newParty = [...myParty, pokemon]
      setMyParty(newParty)
    }
  }

  const handleAddToParty = (pokemon) => {
    selectParty(pokemon)
  }

  const handleRemoveFromParty = (pokemon) => {
    const newParty = myParty.filter((item) => {
      return pokemon.name != item.name
    })
    setMyParty(newParty)
  }



  const handleSearch = (event) => {
    const filteredValues = pokemon.filter((searchPokemon) =>  {
      return searchPokemon.name.includes(event.target.value.toLowerCase());
    }
  );
    console.log(`***${event.target.value}***`)
    console.log(filteredValues)
    setFilteredPokemon(filteredValues); 
    // every time we type a key, we are setting pokemon to filtered list. No way to get filtered ones back
    // does this work? feel like the same thing will probably happen
    // although - every time there is a key press we filter from "all pokemon". Might mean that it does a fresh search every time.
    // worst case - do a search button and make a state to filter with. Would be fine but not as dynamic
  }

 

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Pokedex filteredPokemon={filteredPokemon} handleAddToParty={handleAddToParty} handleRemoveFromParty={handleRemoveFromParty} myParty={myParty} handleSearch={handleSearch}/>} />
        <Route path='/team-builder' element={<TeamBuilder myParty={myParty} />} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
