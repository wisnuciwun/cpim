import * as actionTypes from './actionTypes';

const initialState = {
    companyId: 0,
    officeId: 0,
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
            
        case actionTypes.OFFICES:
            return {
                ...state,
                offices: action.data,
                officeId: ++state.officeId
            }

        default:
            return state;
    }
}

export default rootReducer;