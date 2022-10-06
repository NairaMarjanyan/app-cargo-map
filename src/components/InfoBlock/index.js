import React from "react";
import styles from "./index.module.scss";

function InfoBlock({ children, title, text }) {
    return (
        <div className={styles.CompanyInfoContainer}>
            <div className={styles.CompanyInfoTitle}>{title}</div>
            <div className={styles.CompanyInfoTextAndLogoContainer}>
                {children && (
                    <div className={styles.CompanyInfoLogo}>{children}</div>
                )}
                <p className={styles.CompanyInfoText}>{text}</p>
            </div>
        </div>
    );
}

export default InfoBlock;
