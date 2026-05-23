import Filter from './components/Filter'
import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  
  const handleWordFind = (event) => {
    setSearchText(event.target.value)
  }

  
  

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
        id:persons.length + 1
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
      <Filter  searchText={searchText} handleWordFind={handleWordFind}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewNames={handleNewNames} handleNewNumbers={handleNewNumbers}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchText={searchText}/>
    </div>
  )
}

export default App

