

const Note = ({ note }) => {

    return (
        <li>
            {note.important? <strong>{note.content}</strong>: note.content}
        </li>
    )
}

export default Note