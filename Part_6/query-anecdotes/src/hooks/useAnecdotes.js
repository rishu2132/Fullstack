import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote, createAnecdote } from '../requests'
import useNotification from '../hooks/useNotification'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const { notifyMessage } = useNotification()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
  })


  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnec) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnec.id ? updatedAnec : a))
      notifyMessage(`anedote "${updatedAnec.content}" voted`)
      
    }
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
       notifyMessage(`anecdote "${anecdote.content}" added`)
  
    },
    onError: () =>{
      notifyMessage('too short anecdote , must have length 5 or more')
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes:0}),
    voteIncrement: (anecdote) => updateAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes + 1})
  }
}