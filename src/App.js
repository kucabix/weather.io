//importing react libs
import React from 'react'
import Select from 'react-select'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import styled from 'styled-components'

//importing components and functions
import WeatherInfo from './components/WeatherInfo'
import getCities from './js/get_cities'

//creating styled-component for a main container and header
const MainContainer = styled.div`
  font-family: Montserrat;
  max-width: 700px;
  margin: 0 auto;
  @media (min-width: 600px) {
    border: 2px solid #ccc;
    border-radius: 10px;
  }
`
const Header = styled.div`
  margin: 20px;
`
//Class App is the main Api component. Fetching cities array and rendering main elements.
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: [],
      isLoading: false,
      selectedCity: '',
    }
  }
  //fetching data from city api and setting new state
  componentDidMount() {
    this.setState({isLoading: true})
    getCities('http://dev-weather-api.azurewebsites.net/api/city')
      .then(response => {
        this.setState({
          cities: response,
          isLoading: false
        })
      })
  }
  //react-select onChange method
  handleChange = (selectedCity) => {
    this.setState({selectedCity})
  }
  //rendering MainContainer with Header section and WeatherInfo (updates whenever city is changed)
  render() {
    const {cities, selectedCity, isLoading} = this.state
    return(
      <MainContainer>
        <Header>
          <h1>Weather Info</h1>
          <Select
            value={selectedCity}
            onChange={this.handleChange}
            options={cities}
            placeholder='Please select a city...'
          />
        </Header>
        <WeatherInfo city={selectedCity.value}/>
        <ClipLoader
          css={css`display: block;margin: 20px auto;`}
          loading={isLoading}
        />
      </MainContainer>
    )
  }
}

export default App
