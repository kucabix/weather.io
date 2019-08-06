const axios = require('axios')
//getWeather is fetching weather data for the chosen city, and returning
//the response for the current date
const getWeather = async (city, url) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  const day = today.getDate()
  const response = await axios.get(`${url}/${city}/weather?date=${year}-${month}-${day}`)
  return response.data
}

export default getWeather
