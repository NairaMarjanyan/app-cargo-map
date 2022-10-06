import React from "react";
import styles from "./index.module.scss";
import TextField from "@mui/material/TextField";

function InputTextArea({
    label,
    value,
    onChange,
    ...defaultInputTextFieldProps
}) {
    return (
        <div className={styles.MuiBox}>
            <TextField
                value={value}
                onChange={onChange}
                label={label}
                multiline
                variant="outlined"
                rows={4}
                {...defaultInputTextFieldProps}
            />
        </div>
    );
}

export default InputTextArea;
