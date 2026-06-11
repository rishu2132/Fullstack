

const BlogList = () => {

   return (
    <div>
      <h2>blogs</h2>
      <Notification status={messageStatus} message={errorMessage}/>
      <h4>{user.username} logged in <button onClick={handleLogout}>logout</button></h4>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addNewBlog} blogFormVisible={setBlogFormVisible}/>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={updateLikes} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

export default BlogList