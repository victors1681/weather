import React from 'react'; 
import { useWeather } from "../../hooks";
import styled from "styled-components";
import { WeatherIcon} from "../weather-icon";
import { kelvinToFahrenheit } from "../../utils/temperatures";
import { Forecast } from "../forecast";

const MainWrapper = styled.div`
    background-color: white;
    border-radius:  10px;
    margin: 5em;
    border: 1px solid #e8e8e8;
    height: 100%;
    min-height: 400px;
    width: 100%;
`;

const Header = styled.div`
.temp {
    font-size: 20px;
}
ul{
    list-style: none;
    text-align: right;
    margin: 10px;
}
p{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
    }
}
`
const DisplayError = styled.div`
    padding: 1em;
    text-justify: center;
`

const Loading = styled.div`
    font-size: 20px;
    padding: 5em;
`

export const UserWeather = () => {
    
    const { currentWeather, geolocationMsg, request } = useWeather();

    const renderWeatherInformation = React.useCallback(() => {
        
        if(!currentWeather){
            return null;
        }
        const { name, weather, main: {temp, humidity, temp_min, temp_max } } = currentWeather;

        return (
            <Header>
                <h4>{name}</h4>
                <span className="temp">{kelvinToFahrenheit(temp)} &#8457;</span> 
                {weather.map(w => (<p>{w.description} <WeatherIcon iconCode ={w.icon}/> </p>)) }
                
                 <ul>
                    <li>Humidity: {humidity} %</li>
                    <li>Min: {kelvinToFahrenheit(temp_min)} %</li>
                    <li>Max: {kelvinToFahrenheit(temp_max)} %</li>
                 </ul>
            </Header> 
                )

    }, [currentWeather]) 

    return ( <MainWrapper>  
            {request && <Loading>loading...</Loading>}
            {currentWeather ? renderWeatherInformation() : <DisplayError>{geolocationMsg}</DisplayError> }
            <Forecast/>
        </MainWrapper>
    )
}

export default UserWeather;