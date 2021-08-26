import { google } from 'googleapis'
import Collapsible from 'react-collapsible'
import Plan from '../../components/Plan'

function createPlan({group, people, trips, day}) {
  if (!group) return "Ingen plan for deg denne dagen 😅"
  const groupComrades = people.filter(person => person[0] === group)
  const guides = groupComrades.filter(person => person[2] === 'guide')
  const tripsPlan = trips.filter(trip => trip[1] === group && trip[4] === `${day}`)
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
  const day1 = 'dag1!A:D'
  const day2 = 'dag2!A:D'
  const day3 = 'dag3!A:D'
  const trips = 'Turer!A:E'

  const tripsRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: trips
  })

  const day1Res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: day1
  })

  const day2Res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: day2
  })

  const day3Res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: day3
  })

  const day1Plan = createPlan({
    group: day1Res.data.values.find(person => person.includes(id))?.[0],
    people: day1Res.data.values,
    trips: tripsRes.data.values,
    day: 1
  })

  const day2Plan = createPlan({
    group: day2Res.data.values.find(person => person.includes(id))?.[0],
    people: day2Res.data.values,
    trips: tripsRes.data.values,
    day: 2
  })

  const day3Plan = createPlan({
    group: day3Res.data.values.find(person => person.includes(id))?.[0],
    people: day3Res.data.values,
    trips: tripsRes.data.values,
    day: 3
  })
  const plans = [
    day1Plan,
    day2Plan,
    day3Plan
  ]

  return {
    props: {
      plans 
    }
  }
}

export default function PlanForPerson({plans}) {

  return <div>
    {plans.map((plan, index) => {
      return <div key={index} style={{
        paddingBottom: '1rem',
      }}>
        <Collapsible
          open={true}
          trigger={`Dag: ${index + 1}`}
          triggerStyle={{
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer'
          }}
          transitionTime={300}
        >
          <Plan
            key={index}
            plan={plan}
          ></Plan>
        </Collapsible>
      </div>
    })}
  </div>
}