export default function CharacterDetailsModal({ character, onClose, characters, films, planets, starships, vehicles, species }) {
  if (!character) return null;

  const getLabels = (urls, data, key = 'name') => {
    return urls
      .map(url => data.find(item => item.url === url))
      .filter(Boolean)
      .map(item => item[key]);
  };

  const characterFilms = getLabels(character.films, films, 'title');
  const characterSpecies = getLabels(character.species, species);
  const characterHomeworld = getLabels([character.homeworld], planets);
  const characterStarships = getLabels(character.starships, starships);
  const characterVehicles = getLabels(character.vehicles, vehicles);

  const filmCount = character.films.length;
  const starshipCount = character.starships.length;
  const vehicleCount = character.vehicles.length;

  const filmLabel = filmCount === 1 ? 'filme' : 'filmes';
  const starshipLabel = starshipCount === 1 ? 'espaçonave' : starshipCount > 1 ? 'espaçonaves' : null;
  const vehicleLabel = vehicleCount === 1 ? 'veículo' : vehicleCount > 1 ? 'veículos' : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>{character.name}</h1>
        <div className="modal-section">
          <p><strong>Ano de nascimento:</strong> {character.birth_year}</p>
          <p><strong>Espécie:</strong> {characterSpecies}</p>
          <p><strong>Planeta natal:</strong> {characterHomeworld}</p>
        </div>
        <div className="modal-section">
          <p><strong>{character.name}</strong> apareceu em {filmCount} {filmLabel}:</p>
          <ul>
            {characterFilms.map((film) => (
              <li key={film}>{film}</li>
            ))}
          </ul>
        </div>
        {starshipLabel && (
          <div className="modal-section">
            <p><strong>Possui {starshipCount} {starshipLabel}:</strong></p>
            <ul>
              {characterStarships.map((ship) => (
                <li key={ship}>{ship}</li>
              ))}
            </ul>
          </div>
        )}
        {vehicleLabel && (
          <div className="modal-section">
            <p><strong>Possui {vehicleCount} {vehicleLabel}:</strong></p>
            <ul>
              {characterVehicles.map((vehicle) => (
                <li key={vehicle}>{vehicle}</li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}