import { useState, useMemo } from 'react';

export default function Home({ characters }) {
  const [search, setSearch] = useState('');

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  return (
    <>
      <h1>Personagens de Star Wars</h1>
      <input
        type="text"
        placeholder="Pesquise um personagem"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <ul>
          {filteredCharacters.map((char) => (
            <li key={char.name}>{char.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}