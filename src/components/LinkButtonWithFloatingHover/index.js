import React from "react";

import styles from "./index.module.scss";

function LinkButtonWithFloatingHover({ onClick, isActive, children }) {
    return (
        <div className={styles.LinkButtonWithFloatingHover} onClick={onClick}>
            <a className={`${isActive ? styles.Active : ""}`}>{children}</a>
            <div className={styles.BottomOutline} />
        </div>
    );
}

export default LinkButtonWithFloatingHover;
