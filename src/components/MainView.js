import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    NavigationExperimental,
    Platform,
    StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Player from './Player';
import List from './List';
import { fetchAmanca, fetchLastShows } from './../redux/actions';

/*<Text tabLabel='Les émissions'>Les émissions</Text>*/
export default class MainView extends Component {
    render() {
        return <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
            />
            <ScrollableTabView
                style={styles.tabs}
                renderTabBar={() => <DefaultTabBar
                    textStyle={styles.tabsText}
                    underlineColor="#8C0004"
                    tabStyle={styles.tabStyle}
                />}>
                <List
                    tabLabel='Dernières émissions'
                    fetchItems={this.props.fetchLastShows}
                />
                <List
                    tabLabel='A manca'
                    fetchItems={this.props.fetchAmanca}
                />
            </ScrollableTabView>
            <Player />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 64 : 56,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    tabs: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        marginBottom: 80,
        backgroundColor: '#000'
    },
    tabStyle: {
        height: 60
    },
    tabsText: {
        color: '#FFF'
    }
});

const stateToProps = (state) => {
    return {
        aManca: state.aManca,
    }
}

const dispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAmanca,
        fetchLastShows
    }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(MainView)
