import { useState } from 'react'
import Panel from './components/Panel'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CounterContext from './CounterContext'

const App = () => {
  const [counter, setCounter] = useState(0)

  return (
    <CounterContext.Provider value={{counter,setCounter}}>
      <Navbar/>
      <Panel/>
      <Footer/>
    </CounterContext.Provider>
  )
}

export default App