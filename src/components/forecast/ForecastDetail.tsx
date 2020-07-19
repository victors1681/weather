import * as React from "react";
import { kelvinToFahrenheit } from "../../utils/temperatures";
import { WeatherIcon} from "../weather-icon";
import styled from "styled-components";

const Wrapper = styled.div`
    img {
        width: 50px;
        height: 50px;
    }
`

export const ForecastDetail = ({detail}: { detail: IForecastByDate[] | undefined}) => {

    const sorted = detail && detail.sort((a,b) => a.main.temp - b.main.temp);
    const min = sorted && sorted[sorted.length - 1];
    const max = sorted && sorted[0];
    if(!min || !max ){
        return null;
    }

    return (sorted ? <Wrapper><WeatherIcon iconCode={min.weather[0].icon}/>Min: {kelvinToFahrenheit(max.main.temp)} &#8457; <WeatherIcon iconCode={max.weather[0].icon}/>Max: {kelvinToFahrenheit(min.main.temp)} &#8457;</Wrapper> : null )
} 

export default ForecastDetail;