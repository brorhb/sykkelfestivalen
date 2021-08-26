import Trip from "./Trip"

export default function Plan({plan}) {
  if (typeof plan === 'string') {
    return plan
  } else {
    return <div>
      <b>Guider</b><br></br>
      <ul>
        {plan.guides.map((guide, index) => {
          return <li key={guide[1]}>
            <div>
              <i>{guide[1]}</i>        
            </div>
            <div>
              <i>{guide[3]}</i>
            </div>
          </li>
        })}
      </ul>
      <b>Turer</b>
      <ul>
        {plan.trips.map((trip, index) => {
          return <Trip key={trip} trip={trip}></Trip>
        })}
      </ul>
      <h4>Gruppe</h4>
      <ul>
        {plan.groupComrades
        .filter(person => person[2] === 'deltaker')
        .map((person) => {
          return <li key={person[1]}>
            {person[1]}
          </li>
        })}
      </ul>
    </div>
  }
}