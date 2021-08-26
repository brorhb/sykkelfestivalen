export default function Guide({group = []}) {
  return <div>
    <b>Guider</b>
    <ul>
      {group.filter(person => person[2] === 'guide').map(guide => {
        return <li key={guide}>
          <a href={`/deltakere/${guide[3]}`}>
            <div>
              <i>{guide[1]}</i>        
            </div>
            <div>
              <i>{guide[3]}</i>
            </div>
          </a>
        </li>
      })}
    </ul>
  </div>
}