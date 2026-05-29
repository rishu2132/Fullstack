import Filter from './components/Filter'
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [errorMessage, setErrorMessage] = useState('Nothing added yet')
  const [errorColor , setErrorColor] = useState('greenError')

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
        .then(returnedPerson => setPersons(returnedPerson))
        .then(()=>{
          setErrorMessage(`Added ${personObject.name}`)
          setTimeout(()=>{
            setErrorMessage(null)
          },5000)
        })
      setNewName('')
      setNewNumber('')
    }
    else{
      const existingNumber = persons.find(person => person.number.trim() !== newNumber.trim() && person.name.trim().toLowerCase() === newName.trim().toLowerCase())

      

      console.log(existingNumber)
      if(existingNumber){
        if (window.confirm(`${existingNumber.name} is already added to phonebook, replace old number with a new one?`)){
          
          const newObject = {
          ...existingNumber,number: newNumber
          }
        
          personService
            .update(newObject.id,newObject)
            .then(returnedNumber => setPersons(persons.map(person => person.id === newObject.id ? returnedNumber : person)))
            .then(()=>{
              setErrorColor('greenError')
              setErrorMessage(`Updated number of ${existingNumber.name}`)
              setTimeout(()=> {
                setErrorMessage(null)
              },5000)
            })
            .catch(() => {
              setErrorColor('redError')
              setErrorMessage(`Information of ${existingNumber.name} has already been removed from server`)
              setTimeout(()=>{
                setErrorMessage(null)
              },5000)
            })
        }
          

        }else{
          alert(`${newName} is already added to phonebook`)
          
        }
    setNewName('')
    setNewNumber('')
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
      <Notification status={errorColor} message={errorMessage}/>
      <Filter  searchText={searchText} handleWordFind={handleWordFind}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNewNames={handleNewNames} handleNewNumbers={handleNewNumbers}/>
      <h2>Numbers</h2>
      {filteredPerson.map(person => <Persons key={person.id} person={person} deleteNumber={()=>deleteNumberOf(person.id)}/>)}
    </div>
  )

}
export default App

