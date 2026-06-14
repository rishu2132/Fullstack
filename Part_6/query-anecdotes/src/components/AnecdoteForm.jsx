import { createAnecdote } from "../requests"
import { useQueryClient, useMutation,} from "@tanstack/react-query"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdoteMutation.mutate({content, votes:0})
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