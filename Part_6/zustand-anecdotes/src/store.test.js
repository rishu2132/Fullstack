import { describe, it, beforeEach,vi, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"

vi.mock('./services/anecdotes',() => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {useAnecdoteActions, useAnecdotes} from "./store"



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
})