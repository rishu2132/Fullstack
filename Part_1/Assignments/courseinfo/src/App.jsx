import { useState } from 'react'


const Statistics = ({good , neutral , bad}) => {
  const total = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1))/total
  const positive = ( good / total ) * 100

  if (total == 0){
    return <p>No feedback given</p>
  }
  return (
    <div>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={total}/>
      <StatisticLine text="Average" value={average}/>
      <StatisticLine text="Positive" value={positive} suffix="%"/>
      

    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} >{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}{props.suffix}</p>
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
      <Button onClick={goodFeedback} text="good"/>
      <Button onClick={neutralFeedback} text="neutral"/>
      <Button onClick={badFeedback} text="bad"/>

      <h2>Stats:-</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/> 
    </div>
  )
}


export default App
