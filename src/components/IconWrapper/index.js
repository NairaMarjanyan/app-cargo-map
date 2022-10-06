import React from "react";

import styles from "./index.module.scss";

const IconWrapper = ({
    children,
    borderRadius = 16,
    padding = "25%",
    backgroundColor
}) => {
    return (
        <div
            className={styles.IconWrapper}
            style={{ borderRadius, padding, backgroundColor }}
        >
            {children}
        </div>
    );
};

export default IconWrapper;
