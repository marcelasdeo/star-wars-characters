import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { fetchCharacters, fetchFilms, fetchPlanets, fetchSpecies, fetchStarships, fetchVehicles } from './api/swapi';
import './styles/style.css'

function App() {

  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetchCharacters().then(setCharacters);
    fetchFilms().then(setFilms);
    fetchPlanets().then(setPlanets);
    fetchStarships().then(setStarships);
    fetchVehicles().then(setVehicles);
    fetchSpecies().then(setSpecies);
  }, []);

  return (
    <>
      <Home
        characters={characters}
        films={films}
        planets={planets}
        starships={starships}
        vehicles={vehicles}
        species={species}
      />
    </>
  );
}

export default App;