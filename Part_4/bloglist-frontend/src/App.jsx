import { useState, useEffect,} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  if(user === null ){
    const loggedUserJSON = window.localStorage.getItem('LoggedBlogUser')
    if(loggedUserJSON){
      console.log('logged in again')
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in ', username)
  
    try {
      const user = await loginService.login({username,password})
      window.localStorage.setItem('LoggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('invalid or wrong user')
    }
  }

  const handleLogout = () => {
    if(user !== null){
      window.localStorage.removeItem('LoggedBlogUser')
      setUser(null)
      console.log('logged out')
    }
  }

  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
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
      <h4>{user.username} logged in <button onClick={handleLogout}>logout</button></h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App