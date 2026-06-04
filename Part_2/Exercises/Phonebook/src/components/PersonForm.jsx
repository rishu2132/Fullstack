const PersonForm = (props) => {

    return (
      <form onSubmit={props.addPerson}>
        <div>
          name: <input type="text" value={props.newName} onChange={props.handleNewNames}/>
        </div>
        <div>number: <input value={props.newNumber}  onChange={props.handleNewNumbers}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm