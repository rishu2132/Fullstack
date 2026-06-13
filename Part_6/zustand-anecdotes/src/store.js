
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter:'',
  actions: {
    voteIncrement: (id) => set(state => ({anecdotes: state.anecdotes.map(anecdote => (
      anecdote.id === id? {...anecdote,votes: anecdote.votes + 1} : anecdote
    ))})),
    createNew: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: (value) => set(() => ({filter:value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
