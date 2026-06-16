import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdote = () => {
    const [anecdotes,setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))

    },[])

    const addAnecdote = async (anecdote) => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        setAnecdotes(prev => prev.concat(newAnecdote))
    }

    const removeAnecdote = async (id) => {
        await anecdoteService.remove(id)
        const newAnecdotes = anecdotes.filter(a => a.id !== id)
        setAnecdotes(newAnecdotes)
    }

    return {
        anecdotes,
        addAnecdote,
        removeAnecdote
    }
}