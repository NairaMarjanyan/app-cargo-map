import React from "react";
import styles from "./index.module.scss";

function CompanyStatus({ text, isVerified }) {
    return (
        <div
            className={`${styles.CompanyStatus} ${
                isVerified ? styles.Verified : ""
            }`}
        >
            <span className={styles.Dot} />
            <p>{text}</p>
        </div>
    );
}

export default CompanyStatus;
