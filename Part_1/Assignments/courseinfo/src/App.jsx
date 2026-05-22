import { useState } from 'react'


const Result = ({good , neutral , bad}) => {
  const total = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1))/3
  const positive = ( good / total ) * 100

  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {  neutral}</p>
      <p>bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good + 1)
  }
  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }
  const badFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={goodFeedback}>good</button>
      <button onClick={neutralFeedback}>neutral</button>
      <button onClick={badFeedback}>bad</button>
      <h2>Stats:-</h2>
      <Result good={good} neutral={neutral} bad={bad}/> 
    </div>
  )
}


export default App
