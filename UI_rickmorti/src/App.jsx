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
  const [count, setCount] = useState(0) ;
  const [items, setItems] = useState([]);      // ce que tu affiches
  const [loading, setLoading] = useState(true); // état de chargement
  const [error, setError] = useState(null);     // message d’erreur
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(""); 
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
      console.log("Données reçues :", data);
      setItemsfilter(data);
    } catch (e) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  loadwf();
}, [filter]);



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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          error statue : {error ? "error" : "no error"} <br />
          load statue : {loading ? "loading..." : "loaded"} <br />
          Edit <code>src/App.jsx</code> and save to test HMR <br />
          {items.results[count].name} items.
        </p>
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

        {items.results.map((item) => (
          <div key={item.id}>
            <h2>{item.id} {item.name}</h2>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
