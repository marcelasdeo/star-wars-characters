import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { fetchCharacters } from './api/swapi';
import './styles/style.css'

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters().then(setCharacters);
  }, []);

  return (
    <>
      <Home characters={characters} />
    </>
  );
}

export default App;