import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
    createCompany,
    getCompanies,
    deleteCompany
} from "../../actions/company";
import useActions from "../../useActions";
import { COMPANY_STATUSES, COMPANY_TYPE } from "../../../utils/constants";

const COMPANY_ACTIONS = {
    getCompanies,
    createCompany,
    deleteCompany
};

const useCompanyStore = () => {
    const { companies, loading } = useSelector((state) => {
        const { companiesReducer } = state;
        return {
            companies: companiesReducer.companies,
            loading: companiesReducer.loadingCompanies
        };
    });
    const { getCompanies, createCompany, deleteCompany } =
        useActions(COMPANY_ACTIONS);

    const companiesInfo = useMemo(() => {
        const hasCompanies = companies.length > 0;
        let hasVerifiedCompany = false;

        let hasVerifiedVehicleCompany = false;
        let hasVerifiedLoadCompany = false;
        let hasVerifiedExpediterCompany = false;

        let vehicleCompanies = [];
        let loadCompanies = [];
        let expediterCompanies = [];

        if (hasCompanies) {
            // TODO check only verified company
            for (let company of companies) {
                if (company.type === COMPANY_TYPE.transport) {
                    vehicleCompanies.push(company);
                    if (company.status === COMPANY_STATUSES.verified) {
                        hasVerifiedCompany = true;
                        hasVerifiedVehicleCompany = true;
                    }
                }
                if (company.type === COMPANY_TYPE.load) {
                    loadCompanies.push(company);
                    if (company.status === COMPANY_STATUSES.verified) {
                        hasVerifiedCompany = true;
                        hasVerifiedLoadCompany = true;
                    }
                }
                if (company.type === COMPANY_TYPE.expediter) {
                    expediterCompanies.push(company);
                    if (company.status === COMPANY_STATUSES.verified) {
                        hasVerifiedCompany = true;
                        hasVerifiedExpediterCompany = true;
                    }
                }
            }
        }
        return {
            hasCompanies,
            hasVerifiedCompany,
            vehicleCompanies,
            loadCompanies,
            expediterCompanies,
            hasVerifiedLoadCompany,
            hasVerifiedVehicleCompany,
            hasVerifiedExpediterCompany
        };
    }, [companies]);

    return {
        getCompanies,
        createCompany,
        deleteCompany,
        companies,
        companiesInfo,
        loading
    };
};

export default useCompanyStore;
