import { useState, useEffect, } from 'react'
import { Container, Toolbar, Button, AppBar } from '@mui/material'
import { Routes , Route , Link , useMatch } from 'react-router-dom'
import noteService from './services/notes'
import Footer from './components/Footer'
import Home from './components/Home'
import Note from './components/Note'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  },[])

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const toggleImportanceOf = (id) => {

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id,changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note: returnedNote)))
      })
      .catch(() => {
        setNotes(notes.filter(n => n.id !== id))
      })

  }


  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNotification({ text: `'${returnedNote.content}' added!`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })

  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/" sx={style}>
          home
            </Button>
            <Button color="inherit" component={Link} to="/notes" sx={style}>
          notes
            </Button>
            <Button color="inherit" component={Link} to="/create" sx={style}>
          new note
            </Button>
          </Toolbar>
        </AppBar>

        <Notification notification={notification} />

        <Routes>
          <Route path="/notes/:id" element={
            <Note note={note} toggleImportanceOf={toggleImportanceOf} deleteNote={deleteNote} />
          } />
          <Route path="/notes" element={
            <NoteList notes={notes} />
          } />
          <Route path="/create" element={
            <NoteForm createNote={addNote}/>
          } />
          <Route path="/" element={<Home />} />

        </Routes>
        <Footer />
      </div>
    </Container>
  )
}




export default App
