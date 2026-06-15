import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const CreateNew = ({ addAnecdote }) => {

  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => handleReset()}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
