import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(initialNumbers => setPersons(initialNumbers))
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
        number: newNumber ,
      }
      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
   
    setNewName('')
    setNewNumber('')
  }

  const personChange = searchText ? persons.filter(person => person.name.trim().toLowerCase().includes(searchText.toLowerCase())) : persons

  const deleteNumberOf = (id) => {
    console.log(id,'deleted')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  searchText={searchText} handleWordFind={handleWordFind}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewNames={handleNewNames} handleNewNumbers={handleNewNumbers}/>
      <h2>Numbers</h2>
      {personChange.map(person => <Persons key={person.id} person={person} deleteNumber={()=>deleteNumberOf(person.id)}/>)}
    </div>
  )
}

export default App

