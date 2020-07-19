import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 1000, 
  });

  axiosInstance.interceptors.request.use((config) => {
 
    config.params = config.params || {};
    config.params['appid'] = process.env.REACT_APP_WEATHER_API_KEY;
  
    return config;
});

  export default axiosInstance;