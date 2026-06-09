const NoteForm = ({handleSubmit, newNote, handleNoteChange}) => {

    return (
        <div>
            <h2>Create a new Note</h2>
            <form onSubmit={handleSubmit}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type='submit'>save</button>
            </form>
        </div>  
        )   
}

export default NoteForm