import React from "react";
import styles from "./index.module.scss";
import Switch from "@mui/material/Switch";

function ToggleIndicator() {
    return (
        <div className={styles.ToggleIndicator}>
            <Switch />
        </div>
    );
}

export default ToggleIndicator;
