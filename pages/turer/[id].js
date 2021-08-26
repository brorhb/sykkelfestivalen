import { google } from 'googleapis'
import Collapsible from 'react-collapsible'
import Crew from '../../components/Crew'
import Guide from '../../components/Guides'
import Trip from '../../components/Trip'


function createPlan({group, people, trips, day}) {
  if (!group) return "Ingen plan for deg denne dagen 😅"
  const groupComrades = people.filter(person => person[0] === group)
  const guides = groupComrades.filter(person => person[2] === 'guide')
  const tripsPlan = trips.filter(trip => trip[0] === group && trip[3] === `${day}`)
  return {
    group,
    guides,
    groupComrades,
    trips: tripsPlan
  }
}

export async function getServerSideProps({ query }) {

  // Auth
  const auth = await new google.auth.JWT({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  const sheets = google.sheets({version: 'v4', auth})

  const { id } = query
  
  const trips = `Turer!A${parseInt(id) + 1}:E${parseInt(id) + 1}`

  const tripsRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: trips
  })

  console.log(tripsRes)

  const groupId = tripsRes.data.values?.[0][1]
  const day = `dag${tripsRes.data.values?.[0][4]}!A:D`

  const groups = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: day
  })

  const group = groups.data.values?.filter(person => person[0] === groupId)

  return {
    props: {
      group,
      trip: tripsRes.data.values?.[0]
    }
  }
}

export default function PlanForPerson({group, trip}) {

  return <div>
    <h1><Trip trip={trip}>
      <span style={{
        paddingRight: '1rem'
      }}>
        <i>Dag {trip[4]}:</i>
      </span>
    </Trip></h1>
    <Guide group={group}></Guide>
    <Crew group={group}></Crew>
    <br></br>
  </div>
}
