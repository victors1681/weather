import React from "react";

const BASE_ICON_URL = 'http://openweathermap.org/img/wn';

interface IWeatherIcon {
    iconCode: string
    size?: "2x"
}
export const WeatherIcon = ({iconCode, size = "2x"} : IWeatherIcon) =>{
    
    return( <img src={`${BASE_ICON_URL}/${iconCode}@${size}.png`}/>)
}

export default WeatherIcon;