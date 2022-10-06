import React from "react";
import { TextField, Autocomplete } from "@mui/material";

import styles from "./select.module.scss";

const MultiSelect = ({
    value,
    options,
    required,
    onChange,
    onGetOptionLabel,
    onGetLimitTagsText,
    label,
    ...muDefaultProps
}) => {
    return (
        <div className={styles.MuSelect}>
            <Autocomplete
                value={value}
                disablePortal
                onChange={onChange}
                multiple
                disableCloseOnSelect
                getLimitTagsText={onGetLimitTagsText}
                getoptionlabel={onGetOptionLabel}
                options={options}
                renderInput={(params) => (
                    <TextField {...params} label={label} required={required} />
                )}
                {...muDefaultProps}
            />
        </div>
    );
};

export default MultiSelect;
