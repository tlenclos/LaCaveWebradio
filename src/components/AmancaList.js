import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    TouchableHighlight
} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import { connect } from 'react-redux';
import { navigatePush } from '../redux/actions'

class AmancaList extends React.Component {
    constructor(props) {
        super(props)
        this._renderRowView = this._renderRowView.bind(this);
        this._onFetch = this._onFetch.bind(this);
    }

    _getThumbnailForRow(rowData) {
        if (rowData._embedded['https://api.w.org/featuredmedia'] && rowData._embedded['https://api.w.org/featuredmedia'][0].media_details) {
            return rowData._embedded['https://api.w.org/featuredmedia'][0].media_details.sizes.thumbnail.source_url;
        }

        return null;
    }

    _renderRowView(rowData) {
        const imageUrl = this._getThumbnailForRow(rowData);
        const onClickData = {
            title: rowData.title.rendered,
            uri: rowData.link
        };

        return (
            <TouchableHighlight
                onPress={() => this.props.onRowPress(onClickData)}
            >
                <View style={styles.row}>
                    {imageUrl && <Image
                        source={{uri: imageUrl}}
                        style={styles.image}
                    />}
                    <View style={{flex: 1}}>
                        <Text>{rowData.title.rendered}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    /**
     * Will be called when refreshing
     * Should be replaced by your own logic
     * @param {number} page Requested page to fetch
     * @param {function} callback Should pass the rows
     * @param {object} options Inform if first load
     */
    _onFetch(page = 1, callback, options) {
        this.props.fetchItems(page).then((data) => {
            callback(data);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedListView
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
                    firstLoader={true}
                    enableEmptySections={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    items: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        padding: 10
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        padding: 5
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 10
    }
});

AmancaList.propTypes = {
    fetchItems: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRowPress: (props) => {
            dispatch(navigatePush({ key: 'Post', title: props.title, props}))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AmancaList)
