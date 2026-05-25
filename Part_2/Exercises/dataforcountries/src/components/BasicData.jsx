import axios from 'axios'
import { useEffect, useState } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY

const BasicData = ({name}) => {
    const [countryData , setCountryData] = useState({})
    const [weatherData, setWeatherData] = useState({})

    

    useEffect(()=>{
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                const cData = response.data
                setCountryData(cData)
            })
        
    },[name])

  
    useEffect(()=>{
        if(!countryData.capital)return
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryData.capital[0]}&appid=${api_key}`)
            .then(response => {
                const wdata = response.data
                setWeatherData(wdata)
            })
        },[countryData])
   
    
        return (
            <div>
                <h1>{name}</h1>
                <p>Capital: {countryData.capital}</p>
                <p>Area: {countryData.area}</p>
                <h1>Languages</h1>
                <ul>
                    {countryData.languages && Object.values(countryData.languages).map(value => <li key={value}>{value}</li>)}
                </ul>
                <img src={countryData.flags?.png} />
                <div>
                    <h1>Weather in {countryData.capital}</h1>
                    <p>Temperature: {(weatherData.main?.temp - 273.15).toFixed(2)} Celcius</p>
                    <p>Wind {weatherData.wind?.speed} m/s</p>
                </div>
            </div>
        )
}

    


export default BasicData