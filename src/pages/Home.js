import { useState, useMemo } from 'react';

export default function Home({ characters }) {

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  const sortedCharacters = useMemo(() => {
    return [...filteredCharacters].sort((firstCharacter, secondCharacter) => {
      if (sortOrder === 'ascending') return firstCharacter.name.localeCompare(secondCharacter.name);
      else return secondCharacter.name.localeCompare(firstCharacter.name);
    });
  }, [filteredCharacters, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'ascending' ? 'descending' : 'ascending'));
  };

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
        <button onClick={toggleSortOrder}>
          Ordenar {sortOrder === 'ascending' ? 'Z-A' : 'A-Z'}
        </button>
        <ul>
          {sortedCharacters.map((char) => (
            <li key={char.name}>{char.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}