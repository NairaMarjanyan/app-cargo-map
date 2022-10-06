import {
    ADD_COMPANY,
    REMOVE_COMPANY,
    SET_COMPANIES,
    START_LOADING_COMPANIES
} from "../actions/company";

const DEFAULT_STATE = {
    companies: [],
    loadingCompanies: false
};

const companiesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case START_LOADING_COMPANIES: {
            return {
                ...state,
                loadingCompanies: true
            };
        }
        case SET_COMPANIES: {
            const companies = action.payload;
            return {
                ...state,
                companies,
                loadingCompanies: false
            };
        }
        case ADD_COMPANY: {
            const company = action.payload;
            const companies = [...state.companies, company];
            return {
                ...state,
                companies
            };
        }
        case REMOVE_COMPANY: {
            const companyId = action.payload;
            const companies = state.companies.filter(
                (company) => company.id !== companyId
            );
            return {
                ...state,
                companies
            };
        }
        default:
            return state;
    }
};

export default companiesReducer;
