const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error ('failed to fetch anecdotes from server')
    }

    return await response.json()
}

export const createAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(baseUrl,options)

    if(!response.ok){
        throw new Error('failed to create anecdote')
    }

    return await response.json()
}