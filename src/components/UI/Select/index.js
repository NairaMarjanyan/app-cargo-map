import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuSelect from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import styles from "./index.module.scss";

function Select({
    options,
    value,
    onChange,
    label,
    required,
    inputProps,
    name,
    keyPropertyName = "id",
    valuePropertyName = "id",
    displayPropertyName,
    getDisplayPropertyName,
    error = null,
    ...defaultSelectProps
}) {
    return (
        <div className={styles.Select}>
            <FormControl error={error}>
                <InputLabel required={required}>{label}</InputLabel>
                <MuSelect
                    name={name}
                    inputProps={inputProps}
                    value={value}
                    onChange={onChange}
                    {...defaultSelectProps}
                >
                    {options.map((item, index) => {
                        if (item && typeof item === "object") {
                            let displayValue = item[displayPropertyName];
                            if (typeof getDisplayPropertyName === "function") {
                                displayValue = getDisplayPropertyName(item);
                            }
                            return (
                                <MenuItem
                                    key={item[keyPropertyName]}
                                    value={item[valuePropertyName]}
                                >
                                    {displayValue}
                                </MenuItem>
                            );
                        }

                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                </MuSelect>
                {error && <FormHelperText>Error</FormHelperText>}
            </FormControl>
        </div>
    );
}

export default Select;
