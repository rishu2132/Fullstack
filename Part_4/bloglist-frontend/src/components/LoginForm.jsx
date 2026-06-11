import { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'


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