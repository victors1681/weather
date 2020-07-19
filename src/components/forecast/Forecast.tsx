import * as React from "react";
import { useWeather, useApi } from "../../hooks";
import { groupForecastByDate , getForecastByDate, getShortDate} from "./service/forecastHelpers";
import styled from "styled-components";
import { ForecastDetail} from "./ForecastDetail";

const DateList = styled.ul`
        display: flex;
    list-style: none; 
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px;
`

export const Forecast = () => {
    const [forecastPayload, setForecastPayload] = React.useState<IForecastGroup>();
    const currentDate = new Date().toDateString();
    const [forecastSelected, setForecast] = React.useState(getShortDate(currentDate));

    const { getForecast } = useApi();
    const { userCurrentLocation } = useWeather();

    const initForecast = React.useCallback(async () => {
        try{
        if(userCurrentLocation){
           const response = await getForecast({longitude: userCurrentLocation.longitude, latitude: userCurrentLocation.latitude});
           if(response){
             const group = groupForecastByDate(response); 
            setForecastPayload(group);
           }
        }
    }catch(error){
        console.error(error)
    }
    },[userCurrentLocation]);

    React.useEffect(()=>{
        initForecast()
    }, [userCurrentLocation])

    const selectDate = (date: string) => ()=>  setForecast(date)
    
    const forecastDetailSelected = React.useCallback(()=> getForecastByDate(forecastSelected, forecastPayload), [forecastSelected, forecastPayload]);

    return (
    <React.Fragment>
        <DateList>
            {forecastPayload && Object.keys(forecastPayload).map( key => (<a key={key} id={key} href="#" onClick={selectDate(key)}><li>{key}</li></a>)) }
            </DateList>
            {forecastDetailSelected && <ForecastDetail detail={forecastDetailSelected()}/>}
        </React.Fragment>)
}

export default Forecast;