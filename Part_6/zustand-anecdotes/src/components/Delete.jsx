import { useAnecdoteActions } from "../store"

const Delete = () => {
    const style = {
        marginTop:10,
        marginBottom:10,
        color: 'red'
    }

    const { deleteZero } = useAnecdoteActions()

    return (
        <div style={style}> 
            <button style={{color:'red'}} onClick={deleteZero}>Delete all 0 votes anecdote</button>
        </div>
    )
}

export default Delete