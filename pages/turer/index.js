import { google } from 'googleapis'
import Trip from '../../components/Trip'
import isNumeric from '../../utils/isNumberic'

export async function getServerSideProps() {
  const auth = await new google.auth.JWT({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  const sheets = google.sheets({version: 'v4', auth})
  const trips = 'Turer!A:E'
  const tripsRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: trips
  })

  return {
    props: {
      trips: tripsRes.data.values?.reduce((acc, curr) => {
        const day = curr[4]
        if (!acc[day]) acc[day] = [curr]
        else acc[day].push(curr)
        return acc
      }, {})
    }
  }
}

export default function Trips({trips}) {
  return <div>
    {Object.keys(trips).map(day => isNumeric(day) ? <Day key={day} trips={trips[day]}></Day> : null)}
  </div>
}

function Day({trips}) {
  return <div>
    <h1>Dag {trips[1][4]}</h1>
    <ul>
      {trips.map((trip, index) => {
        return <li key={trip}>
          <a href={`/turer/${trip[0]}`}>
            <Trip trip={trip}></Trip>
          </a>
        </li>
      })}
    </ul>
  </div>
}

