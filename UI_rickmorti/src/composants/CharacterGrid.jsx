import CharacterCard from "./CharacterCard";


export default function CharacterGrid({ results, onSelectIndex }) {
  if (!Array.isArray(results)) return null;

  return (
    <>
      {results.map((item, index) => (
        <CharacterCard
          key={item.id}
          item={item}
          onSelect={() => onSelectIndex(index)}
        />
      ))}
    </>
  );
}
