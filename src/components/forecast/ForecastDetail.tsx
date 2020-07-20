import * as React from "react";
import { kelvinToFahrenheit } from "../../utils/temperatures";
import { WeatherIcon} from "../weather-icon";
import styled from "styled-components";
import { get } from "lodash"

const Wrapper = styled.div`
    img {
        width: 50px;
        height: 50px;
    }
`;

export const ForecastDetail = ({detail}: { detail: IForecastByDate[] | undefined}) => {

    const getTemp = (detail: IForecastByDate[] | undefined) => {
        if(detail){
            const sorted = detail && detail.sort((a,b) => a.main.temp - b.main.temp);
            const min = sorted && sorted[sorted.length - 1] || 0;
            const max = sorted && sorted[0] || 0;
            const minIcon = get(min, 'weather[0].icon');
            const maxIcon = get(max, 'weather[0].icon');

            return { min: kelvinToFahrenheit(min.main.temp_min), minIcon, max:kelvinToFahrenheit(max.main.temp_max), maxIcon}
        }
        return { min: 0, max: 0, minIcon: '', maxIcon: ''}
    };
 
    const { min, max, minIcon, maxIcon } = getTemp(detail)
    
    return (<Wrapper><WeatherIcon iconCode={minIcon}/>Min: {min} &#8457; <WeatherIcon iconCode={maxIcon}/>Max: {max} &#8457;</Wrapper>)
} 

export default ForecastDetail;