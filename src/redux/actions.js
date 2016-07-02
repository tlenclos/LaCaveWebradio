import { amancaApiUrl, lacaveApiUrl } from '../config';
import { FETCH_AMANCA, FETCH_LACAVE_LAST_SHOWS, FETCH_LACAVE_SHOWS } from './constants'

// Navigations
export const NAVIGATE = 'NAVIGATE'
export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY'
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX'
export const NAV_RESET = 'NAV_RESET'

// The following action creators were derived from NavigationStackReducer
export function navigatePush(state) {
    state = typeof state === 'string' ? { key: state, title: state } : state
    return {
        type: NAV_PUSH,
        state
    }
}

export function navigatePop() {
    return {
        type: NAV_POP
    }
}

export function navigateJumpToKey(key) {
    return {
        type: NAV_JUMP_TO_KEY,
        key
    }
}

export function navigateJumpToIndex(index) {
    return {
        type: NAV_JUMP_TO_INDEX,
        index
    }
}

export function navigateReset(routes, index) {
    return {
        type: NAV_RESET,
        index,
        routes
    }
}

export function fetchAmanca(page) {
    return function (dispatch) {
        return fetch(amancaApiUrl + '/posts?_embed&page='+page)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) throw data.error.message || 'Unable to search'
                return data
            })
            .then((data) => {
                dispatch({type: FETCH_AMANCA, data})
                return data;
            })
            .catch((err) => {
                console.log('handle errors', err);
            })
    };
};

export function fetchLastShows(page) {
    return function (dispatch) {
        return fetch(lacaveApiUrl + '/posts?categories=3&_embed&page='+page)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) throw data.error.message || 'Unable to search'
                return data
            })
            .then((data) => {
                dispatch({type: FETCH_LACAVE_LAST_SHOWS, data})
                return data;
            })
            .catch((err) => {
                console.log('handle errors', err);
            })
    };
};

export function fetchShows() {
    return function (dispatch) {
        return fetch(lacaveApiUrl + '/categories?parent=3')
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) throw data.error.message || 'Unable to search'
                return data
            })
            .then((data) => {
                dispatch({type: FETCH_LACAVE_SHOWS, data})
                return data;
            })
            .catch((err) => {
                console.log('handle errors', err);
            })
    };
};

export function fetchPostsForCategory(page, category) {
    return function (dispatch) {
        return fetch(lacaveApiUrl + '/posts?categories='+category+'&_embed&page='+page)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) throw data.error.message || 'Unable to search'
                return data
            })
            .then((data) => {
                dispatch({type: FETCH_LACAVE_SHOWS, data})
                return data;
            })
            .catch((err) => {
                console.log('handle errors', err);
            })
    };
};
