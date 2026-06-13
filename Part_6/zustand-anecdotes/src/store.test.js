import { describe, it, beforeEach,vi, expect } from "vitest"
import { renderHook, act, render,screen } from "@testing-library/react"

vi.mock('./services/anecdotes',() => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {useAnecdoteActions, useAnecdotes} from "./store"
import AnecdoteList from "./components/AnecdoteList"



beforeEach(() => {
    useAnecdoteStore.setState({anecdotes: [], filter: ''})
    vi.clearAllMocks()
})

describe('verify the state of anecdotes', () => {
    it('initialize loads anecdotes from service', async () => {
        const mockAnecdote = [{ id: 1, content: 'Test', votes:0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdote)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const {result: anecdotesResult} = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdote)
    })

    describe('useAnecdotes filtering', () => {
        const anecdotes = [
            {id:1, content: 'the' , votes:2},
            {id:2, content: 'so', votes:3},
            {id:3, content: 'right', votes:0}
        ]

        beforeEach(() => {
            useAnecdoteStore.setState({ anecdotes })
        })

        it('filters anecdote', () => {
            useAnecdoteStore.setState({ anecdotes, filter:'so'})
            const {result} = renderHook(() => useAnecdotes())
            expect(result.current).toEqual([anecdotes[1]])
        })
    })
})