import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import styles from "./index.module.scss";

function RadioButton({ onChange, value, checked, label, name }) {
    return (
        <div className={styles.RadioButton}>
            <FormControlLabel
                value={value}
                name={name}
                control={<Radio />}
                label={label}
                onChange={onChange}
                checked={checked}
            />
        </div>
    );
}

export default RadioButton;
