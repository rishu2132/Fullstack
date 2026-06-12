import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField ,Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    try {
      createBlog({ ...newBlog })
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      navigate('/')
    } catch {
      console.log('error posting blog')
    }

  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog} >
        <div>
          <TextField
            size='small'
            label="title"
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog,title:target.value })}
            style={{ marginTop:10 , width:400 }}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='author'
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
            style={{ marginTop:10 , width:400 }}
          />
        </div>
        <div>
          <TextField
            size='small'
            label='url'
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
            style={{ marginTop:10 , width:400 }}
          />
        </div>
        <div>
          <Button type='submit' variant='contained'
            style={{ marginTop:10 }}
          >
            create
          </Button>
        </div>

      </form>
    </div>
  )
}

export default BlogForm