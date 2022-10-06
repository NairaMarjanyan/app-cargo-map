import React from "react";

import styles from "./index.module.scss";

const InfoItem = ({ text, children }) => {
    return (
        <span className={styles.InfoItem}>
            {children && (
                <span className={styles.IconContainer}>{children}</span>
            )}
            <p className={styles.Text}>{text}</p>
        </span>
    );
};

export default InfoItem;
