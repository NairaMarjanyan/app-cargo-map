import React from "react";

import styles from "./index.module.scss";

function LinkButton({ text, onClick, children }) {
    return (
        <div className={styles.NavLink} onClick={onClick}>
            {children && (
                <span className={styles.IconContainer}>{children}</span>
            )}
            <span>{text}</span>
        </div>
    );
}

export default LinkButton;
