import './App.css';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
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


  // useEffect(() => {
  //   count ++
  // }, [myParty])

  // let count = 0;

  const handleClick = (pokemon) => {
    selectParty(pokemon)
  }

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Pokedex pokemon={pokemon} handleClick={handleClick} myParty={myParty}/>} />
        <Route path='/team-builder' element={<TeamBuilder myParty={myParty} />} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
