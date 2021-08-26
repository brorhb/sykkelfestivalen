import { useState } from "react"

export default function Home() {
  const [text, setInput] = useState("")

  function goTo() {
    window.location.href = `/deltakere/${text}`
  }

  return (
    <div>
      <h1>Sykkelfestivalen 2022</h1>
      <ul>
        <li><a href="/deltakere/day/1">Deltakere: Fredag</a></li>
        <li><a href="/deltakere/day/2">Deltakere: Lørdag</a></li>
        <li><a href="/deltakere/day/3">Deltakere: Søndag</a></li>
        <li>
          <a href="/turer">Turer</a>
        </li>
      </ul>
      <div>
        <div>Finn planen din</div>
        <input onChange={(e) => setInput(e.target.value)} placeholder="Mobilnummer"></input>
        <button onClick={goTo}>Søk</button>
      </div>
    </div>
  )
}
