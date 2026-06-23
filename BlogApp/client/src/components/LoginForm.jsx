import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleLogin(username, password)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      console.log('error during login')
    }
  }
  //   if(user === null ){
  //     const loggedUserJSON = window.localStorage.getItem('LoggedBlogUser')
  //     if(loggedUserJSON){
  //       console.log('logged in again')
  //       const user = JSON.parse(loggedUserJSON)
  //       blogService.setToken(user.token)
  //       setUser(user)
  //     }
  //   }

  return (
    <div>
      <h2>Log in to application</h2>
      {/* <Notification status={messageStatus} message={errorMessage}/> */}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="username"
            variant="standard"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            variant="standard"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{ marginTop: 10 }}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
