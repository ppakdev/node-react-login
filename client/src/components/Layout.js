import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({component: Component, ...rest}) => {
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
};

export default Layout;
