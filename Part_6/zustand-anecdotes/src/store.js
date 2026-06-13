
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set,get) => ({
  anecdotes: [],
  filter:'',
  actions: {
    voteIncrement: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(id,{...anecdote,votes: anecdote.votes + 1})
      set(state => ({anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)}))
    },
    createNew: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: (value) => set(() => ({filter:value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    
  },
}))

const useNotificationStore = create((set) => ({
  notification:'render here notification',
  actions: {
    setNotification: (value) => { 
      set(() => ({notification:value}))
      setTimeout(() => {
        set(() => ({notification: null}))
      },5000)
    },
  }
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
