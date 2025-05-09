const BASE_URL = 'https://swapi.py4e.com/api';

export async function fetchCharacters() {
  try {
    const response = await fetch(`${BASE_URL}/people`);
    if (!response.ok) throw new Error('Erro ao buscar personagens.');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}
