import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    NavigationExperimental,
    Text,
    Platform,
    Image
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const {
    Transitioner: NavigationTransitioner,
    Card: NavigationCard,
    Header: NavigationHeader,
} = NavigationExperimental
import { navigatePush, navigatePop } from './../redux/actions';
import MainView from './MainView';
import Post from './Post';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class AppNavigation extends Component {
    _renderScene({scene}) {
        const { route } = scene
        const props = route.props ? route.props : {};

        switch(route.key) {
            case 'MainView':
                return <MainView />
            case 'Post':
                return <Post {...props} />
        }
    }

    render() {
        let { navigationState, onNavigate } = this.props

        return (
        // Redux is handling the reduction of our state for us. We grab the navigationState
        // we have in our Redux store and pass it directly to the <NavigationTransitioner />.
        <NavigationTransitioner
            navigationState={navigationState}
            style={styles.outerContainer}
            onNavigate={onNavigate}
            renderOverlay={props => (
					<NavigationHeader
						{...props}
						style={styles.header}
						renderTitleComponent={props => {
						    const maxLength = 25;
							const title = props.scene.route.title
							let modifiedTitle = title.slice(0, maxLength);
							if (title.length > maxLength) {
							    modifiedTitle += '...';
							}

                            if (navigationState.index > 0) {
							    return <Text style={styles.title}>{modifiedTitle}</Text>
                            } else {
                                return <Image source={require('./../img/logo2.png')} style={styles.logo} />
                            }
						}}
						// When dealing with modals you may also want to override renderLeftComponent...
					/>
				)}
            renderScene={props => (
					// Again, we pass our navigationState from the Redux store to <NavigationCard />.
					// Finally, we'll render out our scene based on navigationState in _renderScene().
					<NavigationCard
						{...props}
						// Transition animations are determined by the StyleInterpolators. Here we manually
						// override the default horizontal style interpolator that gets applied inside of
						// NavigationCard for a vertical direction animation if we are showing a modal.
						style={props.scene.route.key === 'Modal' ?
									NavigationCard.CardStackStyleInterpolator.forVertical(props) :
									undefined
						}
						// By default a user can swipe back to pop from the stack. Disable this for modals.
						// Just like for style interpolators, returning undefined lets NavigationCard override it.
						panHandlers={props.scene.route.key === 'Modal' ? null : undefined }
						renderScene={this._renderScene}
						key={props.scene.route.key}
					/>
				)}
        />);
    }
}

AppNavigation.propTypes = {
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000',
    },
    outerContainer: {
        flex: 1
    },
    container: {
        flex: 1
    },
    logo: {
        marginLeft: 50,
        height: Platform.OS === 'ios' ? 64 : 57,
        width: 200
    },
    title: {
        color: '#fff',
        marginTop: STATUSBAR_HEIGHT / 2,
        fontSize: 16,
        textAlign: 'center',
    }
});

const stateToProps = (state) => {
    return {
        navigationState: state.navigationState
    }
}

const dispatchToProps = (dispatch) => ({
    onNavigate: (action) => {
        // Two types of actions are likely to be passed, both representing "back"
        // style actions. Check if a type has been indicated, and try to match it.
        if (action.type && (
            action.type === 'BackAction' ||
            action.type === NavigationCard.CardStackPanResponder.Actions.BACK.type)
        ) {
            dispatch(navigatePop())
        } else {
            // Currently unused by NavigationExperimental (only passes back actions),
            // but could potentially be used by custom components.
            dispatch(navigatePush(action))
        }
    }
})

export default connect(stateToProps, dispatchToProps)(AppNavigation)
