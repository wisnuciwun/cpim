import * as actionTypes from './actionTypes';

const initialState = {
    companyId: 0,
    companies: [],
    offices: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COMPANIES:
            return {
                ...state,
                companies: action.data,
                companyId: ++state.companyId
            }

        default:
            return state;
    }
}

export default rootReducer;