import { useAnecdotes, useAnecdoteActions, useFilter } from "../store"
import { useNotificationActions } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const filter = useFilter()
    const sortedAnecdotes = anecdotes.toSorted((a,b) => b.votes - a.votes)
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.includes(filter))
    const {voteIncrement} = useAnecdoteActions()
    const {setNotification} = useNotificationActions()
    return (
        <div>
            {filteredAnecdotes.map(anecdote => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                < div>
                 has {anecdote.votes}
                    <button onClick={() => {
                        voteIncrement(anecdote.id)
                        setNotification(`You voted "${anecdote.content}"`)
                        }}>vote</button>
                </div>
            </div>
            ))}
        </div>
    )
}

export default AnecdoteList