import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar.js'



const Home = () => {

  const [weatherData, setWeatherData] = useState(null)
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    const getData = async () => {

      try {
        const response = await axios.get(`/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=London&days=7`)
        console.log(response.data)
        setWeatherData(response.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleSearch = (searchCity) => {
    setWeatherData(searchCity)
    console.log(searchCity)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setWeatherData(searchCity)
    console.log('submitted', searchCity)
  }

  const hourOfDay = weatherData?.forecast?.forecastday[0].hour
  console.log(hourOfDay)

  useEffect(() => {
    const getCity = async () => {
      try {
        const searchResponse = await axios.get(`/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${searchCity}&days=7`)
        setWeatherData(searchResponse.data)
        console.log('search log', searchResponse.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCity()
  }, [searchCity])

  return (
    <main>
      <Container>
        <Row>
          <h1>{weatherData ?
            weatherData.location.name : ''}</h1>
          <img src={weatherData ? weatherData.current.condition.icon : ''} alt="weather icon" />
          <h2>
            {weatherData ?
              weatherData.current.condition.text : ''}
          </h2>
          <div className='forecastContainer'>
            <Col>
              <SearchBar onSearch={handleSearch} setSearchCity={setSearchCity} searchCity={searchCity} onSubmit={handleSubmit} />
              <div className='current-data'>
                <p className="daily">Daily Forecast</p>
                <p> Chance of Rain <span><strong>{weatherData && weatherData.forecast ?
                  weatherData.forecast.forecastday[0].day.daily_chance_of_rain : ''}%</strong></span></p>
                <p>Current temp <span><strong>{weatherData && weatherData.forecast ?
                  weatherData.current.temp_c : ''}°C</strong></span></p>
                <p>Maximum temp <span><strong>{weatherData && weatherData.forecast ?
                  weatherData.forecast.forecastday[0].day.maxtemp_c : ''}°C</strong></span> -- Minimum temp <span><strong>{weatherData ?
                    weatherData.forecast.forecastday[0].day.mintemp_c : ''}°C</strong></span></p>
              </div>
              <div className="hourlyContainer">
                {weatherData && weatherData.forecast && 
                  weatherData.forecast.forecastday[0].hour.filter((hour, i) => (i <= 24 && i % 3 === 0) || i === 23)
                    .map((hour, i) => {
                      return <div className="hour-data">
                        <p key={hour} value={hour.temp_c}>{hour.time.slice(10)}: {hour.temp_c}°C</p>
                        <img key={i} value={hour.condition.icon} src={weatherData ? weatherData.forecast.forecastday[0].hour[i].condition.icon : ''} alt="weather icon" />
                      </div>
                    })}</div>
            </Col>
          </div>
        </Row>
      </Container>
    </main>
  )
}

export default Home