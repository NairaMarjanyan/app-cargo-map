import axios from "../axios";
const COMPANY_ENDPOINT = "/company/api/v1/companies";

export function createUserCompany(companyData) {
    return axios.post(`${COMPANY_ENDPOINT}`, companyData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function getUserCompanies() {
    return axios.get(`${COMPANY_ENDPOINT}`);
}

export function deleteUserCompany(id) {
    return axios.delete(`${COMPANY_ENDPOINT}/${id}`);
}

export function getUserCompanyById(id) {
    return axios.get(`${COMPANY_ENDPOINT}/${id}`);
}
