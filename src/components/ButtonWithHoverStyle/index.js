import React from "react";

import styles from "./index.module.scss";
import Button from "../UI/Button";

function ButtonWithHoverStyle({ onClick, children }) {
    return (
        <div className={styles.NavLinkWithHoverStyle}>
            <Button
                onClick={onClick}
                className={({ isActive }) => (isActive ? styles.Active : null)}
            >
                {children}
            </Button>
            <hr />
        </div>
    );
}

export default ButtonWithHoverStyle;
