export default function CharacterDetail({ character, onNext }) {
  if (!character) return null;

  return (
    <div>
      <h2>
        {character.id} {character.name}
      </h2>

      <img
        src={character.image}
        alt={character.name}
        className="block_image"
      />

      <div className="info_card">
        Species : {character.species}
        <br />
        Gender : {character.gender}
        <br />
        Status : {character.status}
        <br />
        Location : {character.location?.name}
      </div>

      {/* Bouton suivant (si tu veux le garder ici) */}
      {onNext && (
        <button type="button" onClick={onNext}>
          Suivant
        </button>
      )}
    </div>
  );
}
