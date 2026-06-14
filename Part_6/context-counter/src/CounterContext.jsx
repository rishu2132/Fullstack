import { useState } from 'react'
import { createContext } from 'react'

const CounterContext = createContext()

export default CounterContext

export const CounterContextProvider = (props) => {
    const [counter, setCounter] = useState(0)
    return (
        <CounterContext.Provider value={{counter,setCounter}}>
            {props.children}
        </CounterContext.Provider>
    )
}