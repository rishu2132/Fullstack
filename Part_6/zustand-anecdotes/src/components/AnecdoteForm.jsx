import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../store'

const AnecdoteForm = () => {

    const { createNew } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const addAnecdote = (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        createNew(anecdote)
        setNotification(`You added "${anecdote}"`)
        e.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm