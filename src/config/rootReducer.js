import * as actionTypes from './actionTypes';

const initialState = {
    companies: [],
    offices: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {


    default:
        return state;
    }
}

export default rootReducer;