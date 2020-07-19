import axios from "./config";

export const getWeatherByLocationApi = ()=> axios.get('weather', { params:{
    q:"London"
}})