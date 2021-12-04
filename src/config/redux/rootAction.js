import * as actionTypes from './actionTypes';

export const storeCompanies = (data) => {
    return{
        type: actionTypes.COMPANIES,
        data: data
    }
}