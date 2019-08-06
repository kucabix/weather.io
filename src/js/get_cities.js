const axios = require('axios')
//getCities is fetching data from external url using async/await and axios,
//returning proper formatting for the react-select input
const getCities = async (url) => {
  const response = await axios.get(url)
  const cities = response.data.map(item => {return {value: item.id, label: item.name}})
  return cities
}

export default getCities
