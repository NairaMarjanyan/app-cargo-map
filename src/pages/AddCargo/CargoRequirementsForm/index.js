import React from "react";
import { LOADING_OPTIONS, PERMIT_OPTIONS } from "../../../utils/constants";
import Select from "../../../components/UI/Select";
import MultiSelect from "../../../components/UI/MultiSelect";

import styles from "./index.module.scss";

const CargoRequirementsForm = ({
    data,
    onChange,
    bodyTypes,
    bodySubTypesObj
}) => {
    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        onChange(name, value);
    }

    const vehicleBodySubTypes = bodySubTypesObj[data.bodyTypeId] || [];

    return (
        <div className={styles.CargoRequirementsForm}>
            <div className={styles.Select}>
                <Select
                    value={data.bodyTypeId || ""}
                    onChange={handleInputChange}
                    options={bodyTypes}
                    name="bodyTypeId"
                    label="Body type"
                    required
                    keyPropertyName="id"
                    valuePropertyName="id"
                    displayPropertyName="name"
                    disabled={bodyTypes.length === 0}
                />
            </div>
            <div className={styles.Select}>
                <Select
                    value={data.bodySubTypeId || ""}
                    onChange={handleInputChange}
                    options={vehicleBodySubTypes}
                    name="bodySubTypeId"
                    label="Body Subtype"
                    required
                    keyPropertyName="id"
                    valuePropertyName="id"
                    displayPropertyName="name"
                    disabled={vehicleBodySubTypes.length === 0}
                />
            </div>
            <div className={styles.Select}>
                <MultiSelect
                    value={data.loadings || []}
                    required
                    label="Loadings"
                    name="loadings"
                    onChange={(_, value) => {
                        onChange("loadings", value);
                    }}
                    getOptionLabel={(option) => {
                        return option.name;
                    }}
                    isOptionEqualToValue={(option, loading) => {
                        return option.id === loading.id;
                    }}
                    error={data.errors?.loadings?.[0] || null}
                    options={LOADING_OPTIONS}
                />
            </div>
            <div className={styles.Select}>
                <Select
                    value={data.permit || ""}
                    onChange={handleInputChange}
                    options={PERMIT_OPTIONS}
                    name="permit"
                    required
                    label="Permit"
                    keyPropertyName="id"
                    valuePropertyName="id"
                    displayPropertyName="name"
                />
            </div>
        </div>
    );
};

export default CargoRequirementsForm;
