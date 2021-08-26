export default function Trip({trip, ...props}) {
  const { children } = props
  return <a href={`/turer/${trip[0]}`}>
    <div>
      { children }
      <span>{trip[2]}</span>
      <span
        style={{paddingLeft: '1rem'}}
        className={trip[3]}>
        {trip[3]}
      </span>
    </div>
  </a>
}