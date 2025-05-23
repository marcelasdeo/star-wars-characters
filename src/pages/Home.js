import { useState, useMemo, useEffect } from 'react';
import CharacterDetailsModal from '../components/CharacterDetailsModal';
import { CiCircleMore } from "react-icons/ci";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiLoader } from "react-icons/fi";

export default function Home({ characters, films, planets, starships, vehicles, species }) {

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

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

  useEffect(() => {
    const totalSearchPages = Math.ceil(sortedCharacters.length / itemsPerPage);
    if (currentPage > totalSearchPages) setCurrentPage(totalSearchPages || 1);
  }, [sortedCharacters, currentPage]);

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
    <div id="home">
      <header>
        <img src="/assets/imgs/star-wars-logo.png" alt="Logo de Star Wars" />
        <h1>Personagens</h1>
      </header>
      <main>
        <div id="filtering-container">
          <p>Exibindo {paginatedCharacters.length} de {sortedCharacters.length} personagens</p>
          <div>
            <button onClick={toggleSortOrder}>
              {sortOrder === 'ascending' ? <BsSortAlphaDown className="sort-icon" /> : <BsSortAlphaUp className="sort-icon" />}
            </button>
            <div id="search-container">
              <input
                type="text"
                placeholder="Pesquise um personagem"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoSearch id="search-icon" />
            </div>
          </div>
        </div>
        <div id="characters-list">
          {loading ? (
            <FiLoader id="loading-icon" />
          ) : paginatedCharacters.length > 0 ? (
            paginatedCharacters.map((char) => (
              <div
                className={`characters-container ${selectedCharacter?.name === char.name ? 'selected' : ''}`}
                key={char.name}
              >
                <CiCircleMore
                  className={`details-icon ${selectedCharacter?.name === char.name ? 'selected' : ''}`}
                  onClick={() => { setSelectedCharacter(char) }}
                />
                <p>{char.name}</p>
              </div>
            ))
          ) : (
            <p id="no-result-text">Nenhum personagem encontrado.</p>
          )}
        </div>
        <div id="pagination-container">
          <div>
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              <MdKeyboardDoubleArrowLeft className="go-to-page-icon" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <MdKeyboardArrowLeft className="go-to-page-icon" />
            </button>
          </div>
          {totalPages > 0 && (
            <p id="pagination-summary"> Página {currentPage} de {totalPages} </p>
          )}
          <div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <MdKeyboardArrowRight className="go-to-page-icon" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <MdKeyboardDoubleArrowRight className="go-to-page-icon" />
            </button>
          </div>
        </div>
      </main>
      <footer>
        <div>
          <p>Desenvolvido por <a href="https://github.com/marcelasdeo" target="_blank" rel="noopener noreferrer">Marcela Souza de Oliveira</a></p>
          <p>API: <a href="https://swapi.py4e.com/" target="_blank" rel="noopener noreferrer">SWAPI</a></p>
        </div>
      </footer>

      <CharacterDetailsModal
        character={selectedCharacter}
        onClose={() => { setSelectedCharacter(null) }}
        films={films}
        planets={planets}
        starships={starships}
        vehicles={vehicles}
        species={species}
      />
    </div>
  );
}