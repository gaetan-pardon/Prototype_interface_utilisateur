import { useEffect, useState } from 'react'
import './App.css'
import CharacterDetail from "./composants/CharacterDetail";
import CharacterGrid from "./composants/CharacterGrid";
import { loadCharacters } from "./composants/loader";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true); // état de chargement
  const [error, setError] = useState(null);     // message d’erreur
  const [filter, setFilter] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(null);

  const [itemsfilter, setItemsfilter] = useState([]);  // ce que tu affiches


  useEffect(() => {
    async function loadwf() {
      try {
        setLoading(true);
        setError(null);

        const data = await loadCharacters(filter);

        console.log("Données filtrée reçues :", data);
        setItemsfilter(data);
        setPagesTotal(data.info.pages);
      } catch (e) {
        setError(e.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadwf();
  }, [filter]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page) params.set("page", page);
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (species) params.set("species", species);
    setFilter(params.toString());
    setCount(0);

  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page) params.set("page", 1);
    if (status) params.set("status", status);
    if (gender) params.set("gender", gender);
    if (species) params.set("species", species);
    setFilter(params.toString());
    setCount(0);
    setPage(1);
  }, [status, gender, species]);


  const selected = Array.isArray(itemsfilter?.results)
    ? itemsfilter.results[count]
    : null;

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (itemsfilter.length === 0) return <p>Aucun résultat</p>;
  if (pagesTotal < page) return <p>hors page</p>;


  return (
    <>
      <h1>Rick & Morty</h1>
      <div id="detail" className="card">
        <div className='filters'>
          <button onClick={() => Array.isArray(itemsfilter.results) && (itemsfilter.results.length > count + 1) && setCount((count) => count + 1)}>
            suivant
          </button>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Tous</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>

          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Tous</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>

          <label>
            Species:
            <select value={species} onChange={(e) => setSpecies(e.target.value)}>
              <option value="">Tous</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Mythological Creature">Mythological Creature</option>
            </select>
          </label>
          <label>
            Page :
            <select
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              disabled={loading || !pagesTotal}
            >
              {pagesTotal &&
                Array.from({ length: pagesTotal }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <CharacterDetail character={selected} />

        <CharacterGrid
          results={itemsfilter?.results}
          onSelectIndex={(index) => setCount(index)}
        />


      </div>
    </>
  )
}

export default App
