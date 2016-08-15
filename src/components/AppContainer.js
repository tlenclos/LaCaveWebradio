import {Provider} from 'react-redux';
import store from './../redux/store';
import AppNavigation from './AppNavigation';
import React, { Component } from 'react';

export default class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        );
    }
}
