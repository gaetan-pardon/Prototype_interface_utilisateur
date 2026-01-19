export async function loadCharacters(filter) {
  const res = await fetch("https://rickandmortyapi.com/api/character/?" + filter);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}
