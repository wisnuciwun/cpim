import * as actionTypes from './actionTypes';

const initialState = {
    companies: [],
    offices: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANIES:
            return {
                ...state,
                companies: action.data
            }

        default:
            return state;
    }
}

export default rootReducer;