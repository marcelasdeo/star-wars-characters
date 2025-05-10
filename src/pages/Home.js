import { useState, useMemo } from 'react';
import CharacterDetailsModal from '../components/CharacterDetailsModal';

export default function Home({ characters }) {
console.log('characters', characters);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(sortedCharacters.length / itemsPerPage);

  const paginatedCharacters = useMemo(() => {
    const pageStartIndex = (currentPage - 1) * itemsPerPage;
    return sortedCharacters.slice(pageStartIndex, pageStartIndex + itemsPerPage);
  }, [sortedCharacters, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
          {paginatedCharacters.map((char) => (
            <li key={char.name} onClick={() => { setSelectedCharacter(char) }}>{char.name}</li>
          ))}
        </ul>
        <div>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <p> Página {currentPage} de {totalPages} </p>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>

      <CharacterDetailsModal character={selectedCharacter} onClose={() => { setSelectedCharacter(null) }} />
    </>
  );
}