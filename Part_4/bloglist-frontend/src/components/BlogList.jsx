
import { Link } from 'react-router-dom'
import Blog from './Blog'

const BlogList = ({ blogs }) => {

  return (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog => (
        <li key={blog.id}>
          <Link to={`/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
        </li>
      ))}
    </div>
  )
}

export default BlogList