import React from "react";
import styles from "./index.module.scss";

function Characteristic({ children, text, progressWidth = 0 }) {
    return (
        <div className={styles.Characteristic}>
            <div className={styles.Progress} style={{ width: progressWidth }} />
            <div className={styles.CharacteristicIcon}>{children}</div>
            <p className={styles.CharacteristicText}>{text}</p>
        </div>
    );
}

export default Characteristic;
