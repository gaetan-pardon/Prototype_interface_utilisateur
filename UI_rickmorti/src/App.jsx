import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
    setFilter(params.toString());

  }, [page, status, gender]);


  useEffect(() => {
    setPage(1);
  }, [pagesTotal]);


  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (items.length === 0) return <p>Aucun résultat</p>;


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rick & Morty</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
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
        <div key={items.results[count].id}>
          <h2>{items.results[count].id} {items.results[count].name}</h2>
          <img src={items.results[count].image} alt={items.results[count].name} />
        </div>

        {itemsfilter.results.map((item) => (
          <div key={item.id} style={{ display: "inline-block", margin: "10px" }}>
            <h2>{item.id} {item.name}</h2>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
        <p>
          error statue : {error ? "error" : "no error"} <br />
          load statue : {loading ? "loading..." : "loaded"} <br />
          Edit <code>src/App.jsx</code> and save to test HMR <br />
        </p>
    </>
  )
}

export default App
