import React from "react";
import * as api from "../api";

enum RequestStatus {
    request,
    success,
    fail
}

export interface IUseApi {
    request: boolean;
    success: boolean;
    fail: boolean;
    getWeatherByLocation: ({longitude, latitude}:IUserCurrentLocation) => Promise<IWeather | undefined> 
    getForecast: ({longitude, latitude}:IUserCurrentLocation) => Promise<IForecast | undefined>
}


export const useApi = () => {
    const [request, setRequest] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [fail, setFail] = React.useState(false);

    const setStates = (status: RequestStatus) => {
        [setRequest, setSuccess, setFail].forEach((fn, index) => (index === status ? fn(true) : fn(false)));
    };

     /**
     * @Get Weather by current location
     * @lon number longitude 
     * @lat number latitude
     * @return  IWeather 
     */
    const getWeatherByLocation = async ({longitude, latitude}:IUserCurrentLocation): Promise<IWeather | undefined> => {
        try {
            setStates(RequestStatus.request);
            const result = await api.getWeatherByLocationApi({longitude, latitude});
            if (result) {
                setStates(RequestStatus.success);
                return result.data;
            }
        } catch (error) {
            setStates(RequestStatus.fail);
            return;
        }
        return;
    };
    
    /**
     * Get forecast based on user current location
     * @param param0 
     */

    const getForecast = async ({longitude, latitude}:IUserCurrentLocation): Promise<IForecast | undefined> => {
        try {
            setStates(RequestStatus.request);
            const result = await api.getForecastApi({longitude, latitude});
            if (result) {
                setStates(RequestStatus.success);
                return result.data;
            }
        } catch (error) {
            setStates(RequestStatus.fail);
            return;
        }
        return;
    };
 
    return {
        request,
        success,
        fail,
        getWeatherByLocation,
        getForecast
    }
}

export default useApi;