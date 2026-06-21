import { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)


  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  //   if (!loggedUserJSON) return
  //   const user = JSON.parse(loggedUserJSON)
  //   setUser(user) //eslint-disable-line -- intentional: init from localStorage on mount
  //   noteService.setToken(user.token)
  // },[])



  const notesToShow = showAll ? notes :notes.filter(note => note.important === true)



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
                  {note.user?.name}
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