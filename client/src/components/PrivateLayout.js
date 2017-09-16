import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Auth from '../utils/auth';

const PrivateLayout = ({component: Component, ...rest}) => {
    if (Auth.isAuthenticated) {
        return (
            <Route {...rest} render={matchProps => (
                <div className="App">
                    <NavBar />
                    <div class="container">
                    <Component {...matchProps} />
    
                    </div>
                </div>
            )} />
        )
    } 
    return (<Route {...rest} render={matchProps => (
            <Redirect to={{pathname: "/login"}}/>
        )} />
    )

};

export default PrivateLayout;
