import * as actionTypes from './actionTypes';

export const storeCompanies = (data) => {
    return{
        type: actionTypes.COMPANIES,
        data: data
    }
}

export const resetCompanies = (data) => {
    return{
        type: actionTypes.RESET_COMPANIES,
        data: data
    }
}

export const setPage = (data) => {
    return{
        type: actionTypes.PAGE,
        data: data
    }
}