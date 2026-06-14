import { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import NotificationContext from './NotificationContext'

const App = () => {
  const { anecdotes, isPending, isError, voteIncrement} = useAnecdotes()
  const [notification, setNotification] = useState(null)

  const handleVote = (anecdote) => {
    voteIncrement(anecdote)
    setNotification(`anedote "${anecdote.content}" voted`)
    setTimeout(() => {
      setNotification(null)
    },5000)
  } 

 
  if(isPending){
    return <div>Loading data .....</div>
  }

  if(isError){
    return <div>anecdote service not available due to problems in server</div>
  }


  return (
    <NotificationContext.Provider value={{ notification,setNotification }}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default App