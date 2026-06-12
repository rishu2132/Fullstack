import { useBadFeedback, useGoodFeedback, useNeutralFeedback } from "../store"

const Statistics = () => {
  const good = useGoodFeedback()
  const neutral = useNeutralFeedback()
  const bad = useBadFeedback()
  const all = good + bad + neutral
  const average = (((good*1) + (bad*-1) + (neutral*0))/all).toFixed(2)
  const positive = ((good/all)*100).toFixed(2)
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average ? average : 0}</td></tr>
          <tr><td>positive</td><td>{positive? positive: 0} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
