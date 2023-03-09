import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.js'
import SearchBar from './SearchBar.js'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/v1/forecast.json?key=5f88f3477596486b8d1103719230903&q=London&days=7') // * <-- replace with your endpoint
        console.log(response)
      } catch (error) {
        console.log(error)

      }
    }
    getData()
  }, [])

  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path="/Search.js" element={<SearchBar />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
// Pseudocode

// downloads - axios, bootstrap, react-router-dom, useNavigate

// get the data from site and checking
// check data
// display data
// check different location
// import the daily data (3hour)
// update every hour
// levert hour and weather has separate p-tag
// change background based on icon text
// add search bar
// random location button