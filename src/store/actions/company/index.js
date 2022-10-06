import {
    createUserCompany,
    deleteUserCompany,
    getUserCompanies
} from "../../../api/company";

export const START_LOADING_COMPANIES = "START_LOADING_COMPANIES";
export const SET_COMPANIES = "SET_COMPANIES";
export const ADD_COMPANY = "ADD_COMPANY";
export const REMOVE_COMPANY = "REMOVE_COMPANY";

export function getCompanies() {
    return async (dispatch) => {
        dispatch({ type: START_LOADING_COMPANIES });
        const { data: companies } = await getUserCompanies();
        dispatch({ type: SET_COMPANIES, payload: companies });
        // TODO handle errors
    };
}

export function createCompany(companyData) {
    return async (dispatch) => {
        const { data: company } = await createUserCompany(companyData);
        dispatch({ type: ADD_COMPANY, payload: company });
    };
}

export function deleteCompany(id) {
    return async (dispatch) => {
        await deleteUserCompany(id);
        dispatch({ type: REMOVE_COMPANY, payload: id });
    };
}
