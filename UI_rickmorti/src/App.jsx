import { useEffect, useState } from 'react'
import './App.css'
/*
async function testApi() {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");

    if (!res.ok) {
      throw new Error(res.status); //HTTP ${ }
    }

    const data = await res.json();
    console.log("Données reçues :", data);
  } catch (err) {
    console.log("Erreur :", err.message);
  }
}

testApi(); */

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);      // ce que tu affiches
  const [loading, setLoading] = useState(true); // état de chargement
  const [error, setError] = useState(null);     // message d’erreur
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagesTotal, setPagesTotal] = useState(null);

  const [itemsfilter, setItemsfilter] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");

        if (!res.ok) {
          throw new Error(res.status); //HTTP ${ }
        }

        const data = await res.json();
        console.log("Données reçues :", data);
        setItems(data);
      } catch (err) {
        console.log("Erreur :", err.message);
      } finally {
        setLoading(false);
      }
    } load();
  }, []);

  useEffect(() => {
    async function loadwf() {
      try {
        setLoading(true);
        setError(null);


        const res = await fetch("https://rickandmortyapi.com/api/character/?" + filter);
        if (!res.ok) throw new Error(res.status);

        const data = await res.json();
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


  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (itemsfilter.length === 0) return <p>Aucun résultat</p>;
  if (pagesTotal < page) return <p>hors page</p>;


  return (
    <>
      <h1>Rick & Morty</h1>
      <div id="detail" className="card">
        <button onClick={() => Array.isArray(itemsfilter.results) && (itemsfilter.results.length > count + 1) && setCount((count) => count + 1)}>
          suivant {count}
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
        </label>{Array.isArray(itemsfilter.results) && (
          <div key={itemsfilter.results[count].id}>
            <h2>{itemsfilter.results[count].id} {itemsfilter.results[count].name}</h2>
            <img src={itemsfilter.results[count].image} alt={itemsfilter.results[count].name} className="block_image" />
            <div className="info_card"> Species : {itemsfilter.results[count].species}
              <br />Gender : {itemsfilter.results[count].gender}
              <br />Status : {itemsfilter.results[count].status}
              <br />Location : {itemsfilter.results[count].location.name}
            </div>
          </div>)}
        {console.log("itemsfilter", itemsfilter)}

        {Array.isArray(itemsfilter.results) && itemsfilter.results.map((item, index) => (
          <div key={item.id} className="uni_card">
            <button onClick={() => setCount((count) => index)}>
              <a href="#detail">
                <h2>{item.id} {item.name}</h2>
                <img className="taille_image" src={item.image} alt={item.name} />
              </a>
            </button>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setFilter(input.trim());
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tape un filtre (ex: rick)"
        />
        <button type="submit">Rechercher</button>
      </form>
      <p>
        error statue : {error ? "error" : "no error"} <br />
        load statue : {loading ? "loading..." : "loaded"} <br />
        Edit <code>src/App.jsx</code> and save to test HMR <br />
      </p>
    </>
  )
}

export default App
