import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import AppRoute from './route/Route';
import './assets/css/styles.css';

class Main extends Component {
    
    render() {
        return (
            <>
                <AppRoute />
            </>
        );
    }
}

export default Main;