import axios from "./config";

export const getWeatherByLocationApi = ({longitude, latitude}:IUserCurrentLocation)=> axios.get('weather', { params:{
    lon: longitude,
    lat:latitude,
}})

export const getForecastApi = ({longitude, latitude}:IUserCurrentLocation)=> axios.get('forecast', { params:{
    lon: longitude,
    lat:latitude,
}})