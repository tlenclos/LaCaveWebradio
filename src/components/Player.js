import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AudioPlayer } from '../lib/AudioManager';

const PLAYING = 'PLAYING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

export default class Player extends Component {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this.state = {
            status: STOPPED,
            song: ''
        };
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(
            'AudioBridgeEvent', (evt) => {
                // We just want meta update for song name
                if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
                    this.setState({song: evt.value});
                } else if (evt.status != METADATA_UPDATED) {
                    this.setState(evt);
                }
            }
        );

        AudioPlayer.getStatus((error, status) => {
            (error) ? console.log(error) : this.setState(status)
        });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('state', nextState);
    }

    _onPress() {
        switch (this.state.status) {
            case PLAYING:
                AudioPlayer.pause();
                break;
            case PAUSED:
                AudioPlayer.resume();
                break;
            case STOPPED:
            case ERROR:
                AudioPlayer.play();
                break;
            case BUFFERING:
                AudioPlayer.stop();
                break;
        }
    }

    render() {
        let icon = null;
        switch (this.state.status) {
            case PLAYING:
                icon = <Icon name="pause-circle" size={30} color="#FFF" />;
                break;
            case PAUSED:
            case STOPPED:
            case ERROR:
                icon = <Icon name="play-circle" size={30} color="#FFF" />;
                break;
            case BUFFERING:
            case BUFFERING_START:
            case START_PREPARING:
                icon = <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    size="large"
                />;
                break;
        }

        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress}>
                {icon}
                <Text style={styles.songName}>
                    {this.state.song}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: '#000',
        flexDirection: 'row',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10
    },
    songName: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFF'
    }
});
