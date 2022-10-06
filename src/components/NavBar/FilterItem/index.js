import React from "react";

import styles from "./index.module.scss";

const FilterItem = ({ text, children }) => {
    return (
        <div className={styles.FilterItem}>
            {children && (
                <span className={styles.IconContainer}>{children}</span>
            )}
            <p className={styles.Text}>{text}</p>
        </div>
    );
};

export default FilterItem;
