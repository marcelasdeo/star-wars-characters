const BASE_URL = 'https://swapi.py4e.com/api';

async function fetchSwapiData(endpoint) {
  const results = [];
  let pages = `${BASE_URL}/${endpoint}/?page=1`;

  try {
    while (pages) {
      const response = await fetch(pages);
      if (!response.ok) throw new Error('Erro ao buscar personagens.');
      const data = await response.json();
      results.push(...data.results);
      pages = data.next;
    }
    return results;
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export const fetchCharacters = () => fetchSwapiData('people');
export const fetchFilms = () => fetchSwapiData('films');
export const fetchPlanets = () => fetchSwapiData('planets');
export const fetchStarships = () => fetchSwapiData('starships');
export const fetchVehicles = () => fetchSwapiData('vehicles');
export const fetchSpecies = () => fetchSwapiData('species');