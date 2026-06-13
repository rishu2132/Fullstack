import { useAnecdotes, useAnecdoteActions} from "../store"
import { useNotificationActions } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    
  
    const {voteIncrement} = useAnecdoteActions()
    const {setNotification} = useNotificationActions()
    return (
        <div>
            {anecdotes.map(anecdote => (
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