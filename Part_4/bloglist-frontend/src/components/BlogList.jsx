
import Blog from './Blog'

const BlogList = ({ blogs }) => {

  return (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} /*updateLike={updateLikes} removeBlog={removeBlog} user={user}*/ />
      )}
    </div>
  )
}

export default BlogList