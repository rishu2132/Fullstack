import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: 98924802422,
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleNewNames = (event) => {
   console.log(event.target.value)
   setNewName(event.target.value)   
  }

  const handleNewNumbers = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if(!nameExists){
      const personObject = {
        name: newName  ,
        number: newNumber, 
      }
      setPersons(persons.concat(personObject))
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
   
    setNewName('')
    setNewNumber('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNames}/>
        </div>
        <div>number: <input value={newNumber}  onChange={handleNewNumbers}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App

