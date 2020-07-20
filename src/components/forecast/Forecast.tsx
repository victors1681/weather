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
`;
const DateButton = styled.button`
    cursor: pointer;
    background-color: ${({isActive}: {isActive: boolean}) => isActive? "#e1e0ff" : "#efefef"};
    border: 1px solid #d0d0d0;
    padding: 7px;

    &:hover {
        background-color: #d4d4d4;
    }

`

export const Forecast = () => {
    const [forecastPayload, setForecastPayload] = React.useState<IForecastGroup>();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const [forecastSelected, setForecast] = React.useState(getShortDate(currentDate.toDateString()));
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

    const selectDate = (date: string) => () =>  setForecast(date)
    
    const forecastDetailSelected = React.useCallback(()=> getForecastByDate(forecastSelected, forecastPayload), [forecastSelected, forecastPayload]);

    return (
    <React.Fragment>
        <DateList>
            {forecastPayload && Object.keys(forecastPayload).map( key => (<DateButton key={key} id={key} isActive={key === forecastSelected} onClick={selectDate(key)}><li>{key}</li></DateButton>)) }
            </DateList>
            {forecastDetailSelected && <ForecastDetail detail={forecastDetailSelected()}/>}
        </React.Fragment>)
}

export default Forecast;