export default function Crew({group}) {
  return <div>
    <b>Deltakere</b>
    <ul>
      {group.filter(person => person[2] === 'deltaker').map(person => {
        return <li key={person}>
          <a href={`/deltakere/${person[3]}`}>
            {person[1]}
          </a>
        </li>
      })}
    </ul>
  </div>
}