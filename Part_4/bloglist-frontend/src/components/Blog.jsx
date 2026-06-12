import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {

  const increaseLike = (blog) => {
    const updatedBlog = ({ ...blog, likes:blog.likes + 1 })
    updateLikes(updatedBlog)
  }

  const navigate = useNavigate()
  const handleRemove = (blog) => {
    if (blog.user?.username === user?.username){
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)){
        removeBlog(blog.id)
        navigate('/')
      }
    } else {
      console.log('not the user who created')
    }
  }

  if(!blog){
    return null
  }

  return (
    <div className='blog'>
      <div >
        <h2>{`${blog.author}:${blog.title}`}</h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>likes {blog.likes} {user ? <button onClick={() => {increaseLike(blog)}}>like</button>: null }</p>
        <p>{`Added by ${blog.user?.username}`}</p>
        {blog.user?.username === user?.username ? <button onClick={() => {handleRemove(blog)}}>remove</button> : null}
      </div>
    </div>

  )
}



export default Blog