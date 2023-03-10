import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.js'

const App = () => {

  console.log(process.env.REACT_APP_API_KEY)

  
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <Routes>
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