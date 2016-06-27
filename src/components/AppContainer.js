import {Provider} from 'react-redux';
import store from './../redux/store';
import App from './App';
import React from 'react';

export default AppContainer = React.createClass({
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
})
