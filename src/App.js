import './App.scss';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, useActionData} from "react-router-dom"
import NavBar from './components/NavBar';
import Pokedex from './components/Pokedex';
import ErrorPage from './components/ErrorPage';
import TeamBuilder from './components/TeamBuilder';
import SelectedPokemon from './components/SelectedPokemon';
import PokemonList from './components/PokemonList';
import axios from 'axios';

function App() {


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=493');
        const { results } = response.data;

        const pokemonDetails = await Promise.all(results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          const data = res.data;

          // Fetch weaknesses and strengths
          const typesData = await Promise.all(data.types.map(async (typeObj) => {
            const typeRes = await axios.get(typeObj.type.url);
            return {
              name: typeObj.type.name,
              weaknesses: typeRes.data.damage_relations.double_damage_from,
              strengths: typeRes.data.damage_relations.double_damage_to,
            };
          }));

          return {
            ...data,
            typesData,
          };
        }));

        setPokemonData(pokemonDetails)
        setFilteredPokemon(pokemonDetails)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [typeForFilter, setTypeForFilter] = useState();
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [myParty, setMyParty] = useState([])
  

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
    const filteredValues = pokemonData.filter((searchPokemon) =>  {
      return searchPokemon.name.includes(event.target.value.toLowerCase());
    }
  );
    setFilteredPokemon(filteredValues); 
  } 





 



  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Pokedex pokemonData={pokemonData} setPokemonData={setPokemonData} pokemon={pokemon} filteredPokemon={filteredPokemon} handleAddToParty={handleAddToParty} handleRemoveFromParty={handleRemoveFromParty} myParty={myParty} handleSearch={handleSearch} setMyParty={setMyParty} setFilteredPokemon={setFilteredPokemon} setTypeForFilter={setTypeForFilter} typeForFilter={typeForFilter}/>} />
        <Route path='/list' element={<PokemonList pokemonData={pokemonData} setPokemonData={setPokemonData} pokemon={pokemon} filteredPokemon={filteredPokemon} handleAddToParty={handleAddToParty} handleRemoveFromParty={handleRemoveFromParty} myParty={myParty} handleSearch={handleSearch} />} />
        <Route path='/team-builder' element={<TeamBuilder myParty={myParty} pokemonData={pokemonData} />} />
        <Route path='/pokemon/:id' element={<SelectedPokemon pokemonData={pokemonData}/>} />
        <Route path='*' element={<ErrorPage/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
