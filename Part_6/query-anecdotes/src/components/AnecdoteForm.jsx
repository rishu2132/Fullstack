import { useAnecdotes } from "../hooks/useAnecdotes"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification } = useContext(NotificationContext)
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
    setNotification(`anecdote "${content}" added`)
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" placeholder="at least 5 character long"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm