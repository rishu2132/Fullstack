import axios from 'axios'
import { useEffect, useState } from 'react'

const BasicData = ({name}) => {
    const [countryData , setCountryData] = useState({})

    useEffect(()=>{
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                const cData = response.data
                console.log(cData)
                setCountryData(cData)
            })
    },[name])


    

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
        </div>
    )
}

export default BasicData