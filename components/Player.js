import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Player extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon name="play-circle" size={30} color="#FFF" />
                <Text style={styles.songName}>
                    Song name
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        flexDirection: 'row',
        height: 50
    },
    songName: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFF'
    }
});
