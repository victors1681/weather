import * as React from "react";
import { useApi } from "./useApi";
import { getUserCurrentLocation } from "./services/getCurrentUserLocation";

interface IUseWeather  { 
    initUserLocation: () => Promise<void>
    getWeatherByLocation: ({longitude, latitude}:IUserCurrentLocation) => Promise<IWeather | undefined>
    currentWeather: IWeather | undefined
    geolocationMsg: string
    userCurrentLocation: IUserCurrentLocation | undefined,
    showReIntent: boolean
    success: boolean 
    request: boolean
    fail: boolean
}


/**
 * Weather global context API
 */
const WeatherContext = React.createContext<IUseWeather>({} as IUseWeather);
WeatherContext.displayName = 'WeatherContext Info';

/**
 * This custom hook is used to hold states to use cross components
 */
export const useWeatherContext = () =>{
    const [currentWeather, setCurrentWeather] = React.useState<IWeather | undefined>();
    const [userCurrentLocation, setUserCurrentLocation] = React.useState<IUserCurrentLocation | undefined>()
    const [geolocationMsg, setGeolocationMsg] = React.useState('');
    const [showReIntent, setShowReIntent] = React.useState(false);

    const {getWeatherByLocation, success, request, fail } = useApi();

    const initWeatherByCurrentLocation = async ({longitude, latitude}: IUserCurrentLocation) => {
        try{
        const result  = await getWeatherByLocation({longitude, latitude });
        if(result){
            console.error(result)
            setCurrentWeather(result)
        }
        } catch(err){
            console.error(err)
        }
    }
    const currentLocation = (position: Position) =>  {
        initWeatherByCurrentLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
        setUserCurrentLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
    }
    const showErrors = (error: PositionError) =>{
 
      switch(error.code) {
        case error.PERMISSION_DENIED:
            setShowReIntent(true)
            setGeolocationMsg("Sorry we cannot display the weather based on your current location")
            break;
          case error.POSITION_UNAVAILABLE:
            setGeolocationMsg("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            setGeolocationMsg("The request to get user location timed out.")
            break;
          default:
            setGeolocationMsg("An unknown error occurred.")
            break;
        }
    }
    const initUserLocation = React.useCallback(async () => {
         setShowReIntent(false);
         //Get User location
         const isSupported = await getUserCurrentLocation({currentLocation, showErrors})
         console.error("isSupported", isSupported)
         if(!isSupported){
            setGeolocationMsg("Geolocation is not supported by this browser.")
             console.error("Geolocation is not supported by this browser.");
         }
    },[currentLocation])
    React.useEffect(()=>{
       initUserLocation()
    }, [initUserLocation])
    return { 
        initUserLocation,
        getWeatherByLocation,
        currentWeather,
        geolocationMsg,
        userCurrentLocation,
        showReIntent,
        success, 
        request, 
        fail
    }

}


interface ProviderProps {
    children: React.FunctionComponent | any;
}


/**
 * Weather provider to setup our context api
 * @param children
 */
export const WeatherContextProvider: React.FC<ProviderProps> = ({children}) => {
    const value = useWeatherContext();

    return <WeatherContext.Provider value={value}> 
         { children} 
    </WeatherContext.Provider>;

};

/**
 * instead to import useContext on each component we can use this custom hook to access to the share states 
 */

export const useWeather = () => {
    const weatherHook = React.useContext<IUseWeather>(WeatherContext);
    return weatherHook;
};

export default useWeather;



