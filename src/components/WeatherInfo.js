//importing react livs
import React from 'react'
import PropTypes from 'prop-types'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'

//importing other components and functions
import WeatherToday from '../components/WeatherToday'
import WeatherForecast from '../components/WeatherForecast'
import getWeather from '../js/get_weather'

//class WeatherInfo is rendering weather details whenever props are updated
class WeatherInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      cityData: [],
    }
  }
  //checking if the current city props are different from the previous one
  componentDidUpdate(prevProps) {
    if(this.props.city !== prevProps.city) {
      this.setState({isLoading: true})
      getWeather(this.props.city, 'http://dev-weather-api.azurewebsites.net/api/city')
        .then(response => {
            this.setState({
              cityData: response.map(item => {return item}),
              isLoading: false
            })
          })
    }
  }
  //rendering WeatherToday and WeatherForecast whenever the weather details are
  //updated in the cityData state
  render() {
    const {cityData, isLoading} = this.state
    return(
      <div>
        <ClipLoader
          css={css`display: block;margin: 20px auto;`}
          loading={isLoading}
        />
        {cityData.length > 0 &&
          <div>
            <WeatherToday
              cityData={cityData[0]}
              none={isLoading || !cityData.length}
            />
            <WeatherForecast
              cityData={cityData}
              none={isLoading || !cityData.length}
            />
          </div>
        }
      </div>
    )
  }
}

//type-checking if the name of the city is a string
WeatherInfo.propTypes = {
  city: PropTypes.string
}

export default WeatherInfo
