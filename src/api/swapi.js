const BASE_URL = 'https://swapi.py4e.com/api';

export async function fetchCharacters() {
  const characters = [];
  let pages = `${BASE_URL}/people/?page=1`;

  try {
    while (pages) {
      const response = await fetch(pages);
      if (!response.ok) throw new Error('Erro ao buscar personagens.');
      const data = await response.json();
      characters.push(...data.results);
      pages = data.next;
    }
    return characters;
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}