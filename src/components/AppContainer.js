import {Provider} from 'react-redux';
import store from './../redux/store';
import AppNavigation from './AppNavigation';
import React from 'react';

export default AppContainer = React.createClass({
    render() {
        return (
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        );
    }
})
