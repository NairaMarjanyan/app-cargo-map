import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import styles from "./input.module.scss";

const Input = ({
    label,
    type,
    name,
    onChange,
    required,
    inputProps,
    defaultValue,
    value,
    startIconComponent,
    error,
    ...muiDefaultProps
}) => {
    const startAdornment = useMemo(() => {
        if (startIconComponent) {
            const FieldIcon = startIconComponent;

            return (
                <InputAdornment position="start">
                    <div style={{ width: 24, height: 24 }}>
                        <FieldIcon />
                    </div>
                </InputAdornment>
            );
        }
    }, [startIconComponent]);

    return (
        <div className={styles.MuInput}>
            <Box>
                <TextField
                    {...muiDefaultProps}
                    inputProps={inputProps}
                    label={label}
                    onChange={onChange}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    value={value}
                    required={required}
                    InputProps={{
                        startAdornment
                    }}
                    error={error}
                />
            </Box>
        </div>
    );
};

export default Input;
