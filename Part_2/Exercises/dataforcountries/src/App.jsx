import { useState, useEffect } from "react"
import axios from "axios"
import BasicData from "./components/BasicData"

const App = () => {
  const [countries, setCountries] = useState([])
  const [newName, setNewName] = useState("")
  const [newCountry, setNewCountry] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        const countryNames = response.data.map(
          d => d.name.common
        )
        setCountries(countryNames)
      })
  }, [])

  const searchCountry = (event) => {
    const value = event.target.value

    setNewName(value)

    const filteredCountries = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    )

    setNewCountry(filteredCountries)
    setSelectedCountry(null)
  }

  

  return (
    <div>
      <p>
        find countries
        <input
          type="text"
          value={newName}
          onChange={searchCountry}
        />
      </p>

      { newCountry.length > 10 ? <p>Too many matches, specify another filter</p> : newCountry.length === 1 ? <BasicData name={newCountry[0]}/> : newCountry.map(country => (
        
          <p key={country}>{country} <button onClick={()=>{setSelectedCountry(country)}}>Show</button></p> 
            
        
      ))}
      {selectedCountry && <BasicData name={selectedCountry}/>}
    </div>
  )
}

export default App