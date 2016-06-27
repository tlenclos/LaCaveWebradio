import { FETCH_AMANCA_RESULTS } from './../constants'

const initialState = {
    isLoading: false,
    items: [],
    page: 1
};

export default function aManca(state = initialState, action) {
    switch (action.type) {
        case FETCH_AMANCA_RESULTS:
            return Object.assign({}, state, {
                isLoading: false,
                items: state.items.concat(action.data)
            })
    }

    return state;
}
