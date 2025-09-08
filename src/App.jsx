import { useState } from "react";
import Timeline from "./components/Timeline";
import ArtistLeaderboard from "./components/ArtistLeaderboard";
import TasteEvol from "./components/TasteEvol";
import ShareDonut from "./components/ShareDonut";
import ActivityHeatMap from "./components/ActivityHeatMap";
import CumulativeHours from "./components/CumulativeHours";

function App() {
  const [view, setView] = useState("artists");

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>SpotiDash</h1>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("timeline")}>Timeline</button>
        <button onClick={() => setView("artists")}>Top Artists</button>
        <button onClick={() => setView("taste")}>Taste Evolution</button>
        <button onClick={() => setView("share")}>Listening Share</button>
        <button onClick={() => setView("heatmap")}>Day & Time</button>
        <button onClick={() => setView("cumulative")}>Cumulative Hours</button>
      </nav>
      {view === "timeline" && <Timeline />}
      {view === "artists" && <ArtistLeaderboard />}
      {view === "taste" && <TasteEvol />}
      {view === "share" && <ShareDonut />}
      {view === "heatmap" && <ActivityHeatMap />}
      {view === "cumulative" && <CumulativeHours />}
    </div>
  )
}

export default App


/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */
