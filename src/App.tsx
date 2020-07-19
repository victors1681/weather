import React from 'react'; 
import './App.css'; 
import  {UserWeather}  from "./components/user-weather";
import { WeatherContextProvider } from "./hooks";
function App() { 
  
  return (
    <WeatherContextProvider>
    <div className="App">  
      <UserWeather/>
    </div>
    </WeatherContextProvider>
  );
}

export default App;
