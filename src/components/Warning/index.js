import React from "react";
import styles from "./index.module.scss";
import TriangleWarningSvg from "../icons/24/TriangleWarningSvg";

function Warning({ text }) {
    return (
        <div className={styles.WarningContainer}>
            <div className={styles.WarningIconWrapper}>
                <TriangleWarningSvg />
            </div>
            <p className={styles.WarningText}>{text}</p>
        </div>
    );
}

export default Warning;
