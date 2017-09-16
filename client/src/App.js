import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";

import Layout from './components/Layout';
import PrivateLayout from './components/PrivateLayout';
import Home from "./components/Home";
import Listings from "./components/Listings";
import Login from "./components/Login";

import Auth from "./utils/auth";


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Layout exact path="/" component={Home} />
            <PrivateLayout path="/listings" component={Listings} />
            <Route path="/login" render={matchProps => <Login {...matchProps} />} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
