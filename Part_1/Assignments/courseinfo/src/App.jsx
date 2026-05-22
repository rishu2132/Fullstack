import { useState } from 'react'


const Result = (props) => {
  return (
    <div>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
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
