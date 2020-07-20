import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserWeather, Forecast } from "./components";
import styled from "styled-components";

const MainMenu = styled.ul`
    display: flex;
    list-style: none; 
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px;
`;

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <MainMenu>
            <li>
              <Link to="/">Current Weather</Link>
            </li>
            <li>
              <Link to="/forecast">Forecast</Link>
            </li>
          </MainMenu>
        </nav>

        <Switch>
          <Route path="/forecast">
            <Forecast />
          </Route>
          <Route path="/">
            <UserWeather />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}