import { useState } from 'react'

const SearchBar = ({ onSearch, setSearchCity, searchCity }) => {

  const [ weatherData, setWeatherData ] = useState(null)
  const handleChange = (e) => {
    setSearchCity(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setWeatherData(searchCity)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='text'
            value={searchCity}
            onChange={handleChange}
            name='name'
            placeholder='Search for a city'></input>
        </label>
      </form>
      
    </main>
  )
}
export default SearchBar