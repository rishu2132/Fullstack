

const Blog = ({ blog, updateLikes, removeBlog, user }) => {

  const increaseLike = (blog) => {
    const updatedBlog = ({ ...blog, likes:blog.likes + 1 })
    updateLikes(updatedBlog)
  }

  const handleRemove = (blog) => {
    if (blog.user?.username === user?.username){
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)){
        removeBlog(blog.id)
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
        <span>likes {blog.likes} <button onClick={() => {increaseLike(blog)}}>like</button></span>
        <p>{`Added by ${blog.user?.username}`}</p>
        {blog.user?.username === user?.username ? <button onClick={() => {handleRemove(blog)}}>remove</button> : null}
      </div>
    </div>

  )
}



export default Blog