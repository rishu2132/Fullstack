import { useState, useEffect,} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState('greenError')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
  }, [])


  if(user === null ){
    const loggedUserJSON = window.localStorage.getItem('LoggedBlogUser')
    if(loggedUserJSON){
      console.log('logged in again')
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in ', username)
  
    try {
      const user = await loginService.login({username,password})
      window.localStorage.setItem('LoggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessageStatus('redError')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
      console.log('invalid or wrong user')
    }
  }

  const handleLogout = () => {
    if(user !== null){
      window.localStorage.removeItem('LoggedBlogUser')
      setUser(null)
      console.log('logged out')
    }
    blogService.setToken(null)
  }

  const addNewBlog = async (blogObject) => {
    console.log(blogObject)

    const returnedData = await blogService.create(blogObject)
    setBlogs(prev => prev.concat(returnedData))
    setMessageStatus('greenError')
    setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
        setErrorMessage(null)
    },5000);
  }


  const updateLikes = async (blogObject) => {

    await blogService.updateLike(blogObject)
    const updatedblogs = await blogService.getAll()
    const sortedBlogs = updatedblogs.sort((a,b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    const updatedBlog = await blogService.getAll()
    setBlogs(updatedBlog)
  }

  const hideWhenVisible = {display: blogFormVisible ? "none" : ''}
  const showWhenVisible = {display: blogFormVisible ? "" : "none"}
  

  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification status={messageStatus} message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            <label>username
            <input 
              type="text" 
              value = {username}
              onChange = {({target}) => setUsername(target.value)}
              />
          </label>
          </div>
          <div>
            <label >
            password
            <input
              type="password" 
              value= {password}
              onChange={({target}) => setPassword(target.value)}
              />
          </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification status={messageStatus} message={errorMessage}/> 
      <h4>{user.username} logged in <button onClick={handleLogout}>logout</button></h4>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm createBlog={addNewBlog}/>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} updateLike={updateLikes} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

export default App