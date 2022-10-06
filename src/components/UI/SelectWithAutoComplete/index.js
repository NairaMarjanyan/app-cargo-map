import React from "react";
import { TextField, Autocomplete } from "@mui/material";

import styles from "./select.module.scss";

const SelectWithAutoComplete = ({
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
                disableClearable
                onChange={onChange}
                multiple={false}
                disableCloseOnSelect={false}
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

export default SelectWithAutoComplete;
