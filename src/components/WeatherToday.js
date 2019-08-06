//importing react libs
import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

//creating styled-components
const WeatherBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin: 20px;
  ${props => props.none && css`
    display:none;
  `}
  @media (min-width: 600px) {
    font-size: 15px;
  }
`

const WeatherDiv = styled.div`
  @media (min-width: 600px) {
    flex: 1 1 0;
  }
`

const Info = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  ${props => props.font && css`
    font: ${props.font};
  `}
`

//rendering today weather
const WeatherToday = (props) => {
  const today = new Date()
  return(
    <WeatherBox none={props.none}>
      <WeatherDiv>
        <Info font='bold 15px Montserrat'>{`${today.toLocaleString('en-us', { weekday: 'long' })}, ${today.toLocaleString('en-us', { month: 'long' })} ${today.getDate()}th`}</Info>
        <Info font='bold 30px Montserrat'><img src={require(`../img/${props.cityData.type}.png`)} alt={props.cityData.type} />{props.cityData.temperature}&deg;C</Info>
      </WeatherDiv>
      <WeatherDiv>
        <Info>Precipitation: {`${props.cityData.precipitation}%`}</Info>
        <Info>Humidity: {`${props.cityData.humidity}%`}</Info>
        <Info>Wind: {`${props.cityData.windInfo.speed}MPH ${props.cityData.windInfo.direction}`}</Info>
        <Info>Pollen Count: {props.cityData.pollenCount}</Info>
      </WeatherDiv>
    </WeatherBox>
  )
}

//typechecking if cityData is an object (data for just one day), and none is a bool
WeatherToday.propTypes = {
  cityData: PropTypes.object,
  none: PropTypes.bool
}

export default WeatherToday
