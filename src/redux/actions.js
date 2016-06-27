import { amancaApiUrl } from '../config';
import { FETCH_AMANCA_RESULTS } from './constants'

export function fetchAmanca(page) {
    return function (dispatch) {
        return fetch(amancaApiUrl + '/posts?_embed&page='+page)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) throw data.error.message || 'Unable to search'
                return data
            })
            .then((data) => {
                dispatch({type: FETCH_AMANCA_RESULTS, data})
                return data;
            })
            .catch((err) => {
                console.log('handle errors', err);
            })
    };
};
