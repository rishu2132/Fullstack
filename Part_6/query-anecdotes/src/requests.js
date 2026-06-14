const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error ('failed to fetch anecdotes from server')
    }

    return await response.json()
}