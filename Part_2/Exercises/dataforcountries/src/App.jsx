import { useState } from "react"
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState(null)
  const [newName , setNewName] = useState('')

  const searchCountry = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    
    axios 
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => response.data)
      .then(datas => datas.map(data => console.log(data.name.common)))
  }

  return(
    <div>
      <p>find countries <input type="text" value={newName} onChange={searchCountry}/></p>
    </div>
  )
}

export default App