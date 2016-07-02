import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navigatePush, fetchPostsForCategory } from './../redux/actions';
import List from './List';

export default class ListShows extends Component {
    _getImageFromDescription(rowData) {
        if (rowData.description) {
            const regexTest = new RegExp('<img.*?src="(.*?)"');
            let result = regexTest.exec(rowData.description);
            return result ? result[1] : null;
        }

        return null;
    }
    render() {
        return <List
            pagination={false}
            fetchItems={this.props.fetchItems}
            renderRow={(rowData) => {
                const showImage = this._getImageFromDescription(rowData);
                if (!showImage) return null;

                return <TouchableHighlight style={styles.row} onPress={() => this.props.onRowPress(rowData.name, {
                    fetchItems: (page) => {
                        return this.props.fetchPostsForCategory(page, rowData.id)
                    }
                })}>
                    <Image source={{uri: showImage}} style={styles.image} />
                </TouchableHighlight>;
            }}
        />
    }
}

ListShows.propTypes = {
    fetchItems: React.PropTypes.func.isRequired,
    fetchPostsForCategory: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    row: {
    },
    image: {
        height: 300
    }
});

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRowPress: (title, props) => {
            dispatch(navigatePush({ key: 'List', title: title, props}))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListShows)
