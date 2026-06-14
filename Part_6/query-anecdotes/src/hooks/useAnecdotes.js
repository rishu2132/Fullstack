import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote, createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const {setNotification} = useContext(NotificationContext)

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
      setNotification(`anedote "${updatedAnec.content}" voted`)
      setTimeout(() => {
        setNotification(null)
      },5000)
    }
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
       setNotification(`anecdote "${anecdote.content}" added`)
      setTimeout(() => {
        setNotification(null)
      },5000)
  
    },
    onError: () =>{
      setNotification('too short anecdote , must have length 5 or more')
      setTimeout(() => {
        setNotification(null)
      },5000)
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