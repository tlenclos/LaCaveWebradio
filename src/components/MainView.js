import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    NavigationExperimental
} from 'react-native';
import { bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Player from './Player';
import AmancaList from './AmancaList';
import { fetchAmanca} from './../redux/actions';

export default class MainView extends Component {
    render() {
        return <View style={styles.container}>
            <ScrollableTabView
                style={styles.tabs}
                renderTabBar={() => <DefaultTabBar />}>
                <AmancaList
                    tabLabel='A manca'
                    fetchItems={this.props.fetchAmanca}
                />
                <Text tabLabel='Dernières émissions'>Dernières émissions</Text>
                <Text tabLabel='Les émissions'>Les émissions</Text>
            </ScrollableTabView>
            <Player />
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabs: {
        marginBottom: 50
    }
});

const stateToProps = (state) => {
    return {
        aManca: state.aManca,
    }
}

const dispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAmanca
    }, dispatch)
}

export default connect(stateToProps, dispatchToProps)(MainView)
