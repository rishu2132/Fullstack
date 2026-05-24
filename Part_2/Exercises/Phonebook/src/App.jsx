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
   setNewName(event.target.value)   
  }

  const handleNewNumbers = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()

    const nameExists = persons.some(person => person.name.trim().toLowerCase() === newName.trim().toLowerCase())
    
    if(!nameExists){
      const personObject = {
        name: newName  ,
        number: newNumber ,
      }
      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setNewName('')
      setNewNumber('')
    }
    else{
      const numberSame = persons.filter(person => person.number.trim() !== newNumber.trim() && person.name.trim().toLowerCase() === newName.trim().toLowerCase())

      if (window.confirm(`${numberSame[0].name} is already added to phonebook, replace old number with a new one?`)){
        const newObject = {
        ...numberSame[0],number: newNumber
      }

      
      personService
        .update(newObject.id,newObject)
        .then(returnedNumber => setPersons(persons.map(person => person.id === newObject.id ? returnedNumber:person)))
      }
      } 
      
  }

  const filteredPerson = searchText ? persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase())) : persons

  const deleteNumberOf = (id) => {
    console.log(id,'deleted')
    if (window.confirm('Do you want to delete the number')){
      personService
      .remove(id)
      .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter  searchText={searchText} handleWordFind={handleWordFind}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewNames={handleNewNames} handleNewNumbers={handleNewNumbers}/>
      <h2>Numbers</h2>
      {filteredPerson.map(person => <Persons key={person.id} person={person} deleteNumber={()=>deleteNumberOf(person.id)}/>)}
    </div>
  )

}
export default App

