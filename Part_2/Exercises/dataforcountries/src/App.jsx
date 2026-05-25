import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [newName, setNewName] = useState("")
  const [newCountry, setNewCountry] = useState([])

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

      {newCountry.map(country => (
        <p key={country}>{country}</p>
      ))}
    </div>
  )
}

export default App