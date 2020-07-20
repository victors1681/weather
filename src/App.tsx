import React from 'react'; 
import './App.css';  
import { WeatherContextProvider } from "./hooks";
import Router from "./router"
import styled from "styled-components";

const MainWrapper = styled.div`
    background-color: white;
    border-radius:  10px;
    margin: 5em;
    border: 1px solid #e8e8e8;
    height: 100%;
    min-height: 400px;
    width: 100%;
    max-width: 60%;
`;


function App() {   
  return (
    <WeatherContextProvider>
    <div className="App">  
    <MainWrapper> 
      <Router/>
      </MainWrapper>
    </div>
    </WeatherContextProvider>
  );
}

export default App;
