import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  },[])

  
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

