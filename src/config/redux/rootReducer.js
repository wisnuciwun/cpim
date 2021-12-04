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
                companyId: ++state.companyId,
                officeId: ++state.officeId
            }

        case actionTypes.RESET_COMPANIES:
            return {
                ...initialState,
            }
        
        default:
            return state;
    }
}

export default rootReducer;