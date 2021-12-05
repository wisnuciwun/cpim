import * as actionTypes from './actionTypes';

const initialState = {
    companyId: 0,
    officeId: 0,
    pagename: "",
    companies: [],
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
        
        case actionTypes.PAGE:
            return {
                ...state,
                pagename: action.data
            }
        
        default:
            return state;
    }
}

export default rootReducer;