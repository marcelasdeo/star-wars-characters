export default function CharacterDetailsModal({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>{character.name}</h1>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}