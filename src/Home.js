import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar.js'



const Home = () => {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      
      const response = await axios.get('/v1/forecast.json?key=5f88f3477596486b8d1103719230903&q=Los_Angeles&days=7') // * <-- replace with your endpoint
      // console.log(response.data)
      setWeatherData(response.data)
    }
    getData()
  }, [])

  const handleSearch = (searchedCity) => {
    setWeatherData(searchedCity)
  }

  const hourOfDay = weatherData?.forecast.forecastday[0].hour
  console.log(hourOfDay)

  return (
    <main>
      <Container>
        <Row>
          <h1>Daily Forecast</h1>
          <p>{weatherData ?
            weatherData.location.name : ''}</p>
              <SearchBar onSearch={handleSearch} />
          <div className='forcastContainer'>
            <Col>
              <p>{weatherData ?
                weatherData.current.condition.text : ''}</p>

              {/* <img src={png} alt={"weather icon"} {weatherData ?
                weatherData.current.condition.icon : ''}></img> */}

              <p> Chance of Rain {weatherData ?
                weatherData.forecast.forecastday[0].day.daily_chance_of_rain : ''}%</p>
              <img src={weatherData ? weatherData.current.condition.icon : ''} alt="weather icon" />
              <p>Current temp {weatherData ?
                weatherData.current.temp_c : ''}°C</p>
              <p>Maximum temp {weatherData ?
                weatherData.forecast.forecastday[0].day.maxtemp_c : ''}°C  Minimum temp {weatherData ?
                  weatherData.forecast.forecastday[0].day.mintemp_c : ''}°C </p>
              <img src={weatherData ? weatherData.forecast.forecastday[0].hour[2].condition.icon : ''} alt="weather icon" />
              {weatherData &&
                weatherData.forecast.forecastday[0].hour.filter((hour, i) => (i <= 24 && i % 3 === 0) || i === 23)
                  .map(hour => {
                    return <p key={hour} value={hour.temp_c}>{hour.time.slice(10)} - {hour.temp_c}°C</p>
                  })}

            </Col>
          </div>
        </Row>
      </Container>
    </main>
  )
}

export default Home