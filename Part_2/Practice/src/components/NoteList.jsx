import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import loginService from '../services/login'
import noteService from '../services/notes'
import Notification from './Notification'
import Togglable from './Toggable'
import { Table, TableBody, TableCell, TableHead , TableContainer, TableRow, Paper  } from '@mui/material'

const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (!loggedUserJSON) return
    const user = JSON.parse(loggedUserJSON)
    setUser(user) //eslint-disable-line -- intentional: init from localStorage on mount
    noteService.setToken(user.token)
  },[])



  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with',username,password)
    try {
      const user = await loginService.login({ username,password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }
  const notesToShow = showAll ? notes :notes.filter(note => note.important === true)

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesToShow.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>
                  {note.user.name}
                </TableCell>
                <TableCell>
                  {note.important ? 'yes':''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )


}

export default NoteList