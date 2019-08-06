//importing react libs
import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

//creating styled-components
const Forecast = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin: 10px;
  border-top: 1px solid #ccc;
  ${props => props.none && css`
    display:none;
  `}
  @media (min-width: 600px) {
    flex-direction: row;
    border: none;
  }
`

const DayRecord = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  @media (min-width: 600px) {
    flex-direction: column;
    border: none;
    flex: 1 1 0;
  }
`
const Item = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 0;
  ${props => props.bold && css`
    font-weight: bold;
  `}
`
//WeatherForecast is a functional component rendering the forecast for the next days
const WeatherForecast = (props) => {
  const forecast = props.cityData.map((item,id) => {
    //changing the date format to create proper Date object
    const date = new Date(item.date.slice(0,4),item.date.slice(5,7)-1,item.date.slice(8,10))
    return(
      <DayRecord key={date}>
        <Item bold>{id === 0 ? `Today` : `${date.toLocaleString('en-us', { weekday: 'long' })}`}</Item>
        <Item><img src={require(`../img/${item.type}.png`)} alt={item.type} /></Item>
        <Item>{item.temperature}&deg;C</Item>
        <Item>{`Pollen: ${item.pollenCount}`}</Item>
      </DayRecord>
    )
  })
  return(
    <Forecast none={props.none}>
      {forecast}
    </Forecast>
  )
}

//type-checking if the cityData is an array and none is a bool
WeatherForecast.propTypes = {
  cityData: PropTypes.array,
  none: PropTypes.bool
}

export default WeatherForecast
