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
import { decode as decodeHtml } from 'he';
import { navigatePush } from '../redux/actions'

class List extends React.Component {
    constructor(props) {
        super(props)
        this._renderRowView = this._renderRowView.bind(this);
        this._onFetch = this._onFetch.bind(this);
    }

    _getThumbnailForRow(rowData) {
        if (rowData._embedded['https://api.w.org/featuredmedia'] && rowData._embedded['https://api.w.org/featuredmedia'][0].media_details) {
            return rowData._embedded['https://api.w.org/featuredmedia'][0].media_details.sizes.thumbnail.source_url;
        }

        if (rowData._embedded['wp:featuredmedia'] && rowData._embedded['wp:featuredmedia'][0].media_details) {
            return rowData._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
        }

        return null;
    }

    _getExcerpt(rowData) {
        const excerpt = decodeHtml(rowData.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '')).trim();
        return excerpt.length > 0 ? excerpt : null;
    }

    _renderRowView(rowData) {
        const imageUrl = this._getThumbnailForRow(rowData);
        const excerpt = this._getExcerpt(rowData);
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
                        <Text style={styles.title}>{rowData.title.rendered}</Text>
                        {excerpt && <Text style={styles.excerpt}>{excerpt}</Text>}
                        <Text style={styles.date}>{new Date(rowData.date).toLocaleDateString()}</Text>
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
                    customStyles={{
                        paginationView: {backgroundColor: 'black'}
                    }}
                    paginationWaitingView={(paginateCallback) => {
                        return <TouchableHighlight
                            underlayColor='#c8c7cc'
                            onPress={paginateCallback}
                            style={styles.loadMoreView}
                          >
                            <Text style={styles.loadMoreText}>
                              Plus d'articles...
                            </Text>
                        </TouchableHighlight>;
                    }}
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
    title: {
        fontWeight: 'bold'
    },
    image: {
        height: 100,
        width: 100,
        marginRight: 10
    },
    excerpt: {
        marginTop: 10
    },
    date: {
        marginTop: 10,
        color: '#8C0004'
    },
    loadMoreView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadMoreText: {
        fontSize: 18,
        color: '#FFF'
    }
});

List.propTypes = {
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
)(List)
