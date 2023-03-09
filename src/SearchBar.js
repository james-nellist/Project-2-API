import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState('')
  const handleChange = (e) => {
    setSearchCity(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchCity)
  }
  return (
    <main>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input type='text'
            value={searchCity}
            onChange={handleChange}
            name='name'
            placeholder='Search for a city'></input>
          <input type='submit' value='Go'></input>
        </label>
      </form>
    </main>
  )
}
export default SearchBar