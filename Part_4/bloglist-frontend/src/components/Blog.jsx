import { useState } from "react"

const Blog = ({ blog }) => {
  const [blogView, setBlogView] = useState(false)
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blogDetail = () => (
      <div>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user?.username}</p>
      </div>
    )

  return (
    <div style={blogStyle}>
      <div >
        {blog.title} {blog.author}
        <button onClick ={() => {setBlogView(prev => !prev)}}>{blogView ? 'hide' :'view'}</button>
      </div> 
      {blogView && blogDetail()}
    </div>

  )
}
  


export default Blog