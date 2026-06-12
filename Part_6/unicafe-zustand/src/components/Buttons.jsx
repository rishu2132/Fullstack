import { useFeedbackControl } from "../store"

const Buttons = () => {
    const { positive, negative, zero } = useFeedbackControl()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={positive}>good</button>
      <button onClick={zero}>neutral</button>
      <button onClick={negative}>bad</button>
    </div>
  )
}

export default Buttons
