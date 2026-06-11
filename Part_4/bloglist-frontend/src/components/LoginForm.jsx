import { useState } from 'react'
import  loginService  from '../services/login'
import blogService  from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in ', username)

    try {
      const user = await loginService.login({ username,password })
      window.localStorage.setItem('LoggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      //setMessageStatus('redError')
      //setErrorMessage('wrong username or password')
      //setTimeout(() => {
      //setErrorMessage(null)
      //},3000)
      //console.log('invalid or wrong user')
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

  return (
    <div>
      <h2>Log in to application</h2>
      {/* <Notification status={messageStatus} message={errorMessage}/> */}
      <form onSubmit={handleLogin}>
        <div>
          <label>username
            <input
              type="text"
              value = {username}
              onChange = {({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label >
            password
            <input
              type="password"
              value= {password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm