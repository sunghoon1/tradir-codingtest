import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BeerList from './Pages/BeerList';
import Home from "./Pages/Home";
// import ReactGA from "react-ga";

const Routes = () => {

  return (
    <Router>
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/beerlist' component={BeerList}/>
          <Redirect to='/home' component={Home}/>
        </Switch>
    </Router>
  );
};

export default Routes;
