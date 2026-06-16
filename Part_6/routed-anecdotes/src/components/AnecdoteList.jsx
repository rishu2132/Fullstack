import { useAnecdote } from "../hooks/useAnecdote"

const AnecdoteList = () => {
  const {anecdotes, removeAnecdote } = useAnecdote()
  const handleRemove = (id) => {
    removeAnecdote(id)
    console.log('deleting failed')
  }
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content} <button onClick={() => handleRemove(anecdote.id)}>delete</button></li>)}
    </ul>
  </div>
)
}

export default AnecdoteList
