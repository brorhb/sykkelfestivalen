import { google } from "googleapis"
import Crew from "../../../components/Crew"
import Guide from "../../../components/Guides"

export async function getServerSideProps({ query }) {
  console.log(query)
  const { id } = query
  const auth = await new google.auth.JWT({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  const sheets = google.sheets({version: 'v4', auth})
  const dayQuery = `dag${id}!A:D`

  const dayRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: dayQuery
  })

  return {
    props: {
      day: id,
      people: dayRes.data.values
    }
  }
}

export default function People({people, day}) {
  return <div>
    <h1>Dag {day}</h1>
    <Guide group={people}></Guide>
    <Crew group={people}></Crew>
  </div>
}