import { FETCH_AMANCA } from './../constants'

const initialState = {
    isLoading: false,
    items: [],
    page: 1
};

export default function aManca(state = initialState, action) {
    switch (action.type) {
        case FETCH_AMANCA:
            return Object.assign({}, state, {
                isLoading: false,
                items: state.items.concat(action.data)
            })
    }

    return state;
}
