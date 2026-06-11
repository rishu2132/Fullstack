import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import loginService from '../services/login'
import noteService from '../services/notes'
import Note from './Note'
import Notification from './Notification'
import Togglable from './Toggable'


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

  const toggleImportanceOf = (id) => {

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id,changedNote)
      .then(returnedNote => {
        //setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        //setNotes(notes.filter(n => n.id !== id))
      })

  }

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
      <Notification message={errorMessage}/>
      {!user && loginForm()}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
      </ul>
    </div>
  )

}

export default NoteList