import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Platform
} from 'react-native';

export default class Post extends Component {
    render() {
        return <View style={styles.container}>
            <WebView
                automaticallyAdjustContentInsets={false}
                source={{uri: this.props.uri}}
                javaScriptEnabled={true}
                decelerationRate="normal"
                startInLoadingState={true}
                scalesPageToFit={true}
                style={styles.webview}
            />
        </View>;
    }
}

Post.propTypes = {
    title: React.PropTypes.string.isRequired,
    uri: React.PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 65 : 55,
        flex: 1,
        flexDirection: 'column',
    },
    webview: {
    }
});

export default Post;
