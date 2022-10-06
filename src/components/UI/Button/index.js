import React from "react";

import styles from "./index.module.scss";

function Button({ children, onClick, className, ...buttonProps }) {
    const classes = [styles.Button];
    if (className) {
        classes.push(className);
    }
    return (
        <button
            onClick={onClick}
            className={classes.join(" ")}
            {...buttonProps}
        >
            {children}
        </button>
    );
}

export default Button;
