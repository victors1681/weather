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
     * 
     * @return 
     */
    const getWeatherByLocation = async (): Promise<Array<any>> => {
        try {
            setStates(RequestStatus.request);
            const result = await api.getWeatherByLocationApi();
            if (result) {
                setStates(RequestStatus.success);
                return result.data;
            }
        } catch (error) {
            setStates(RequestStatus.fail);
            return [];
        }
        return [];
    };
 
    return {
        request,
        success,
        fail,
        getWeatherByLocation
    }
}

export default useApi;