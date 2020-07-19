import * as React from "react";
import { useApi } from "./useApi";

export const useWeather = () =>{
    const {getWeatherByLocation } = useApi();

    const initialRequest = async () => {
        const result  = await getWeatherByLocation();
        if(result){
            console.error("API response", result);
        }
    }

    React.useEffect(()=>{
        initialRequest();
    }, [])
    return {
        
    }

}

