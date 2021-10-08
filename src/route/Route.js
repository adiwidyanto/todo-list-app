import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../page/HomePage';

const AppRoute = ({component = Component, layout: Layout, ...rest}) => (
    <Router>

        <Route exact path="/" component={HomePage} />
        {/* <Route exact path="/" component={TodosPage} /> */}
        
    </Router>
);

export default AppRoute;