import React from "react";
import Button from "../Button";

import styles from "./index.module.scss";

function SecondaryButton({ children, onClick, className, ...buttonProps }) {
    return (
        <Button
            onClick={onClick}
            className={`${styles.SecondaryButton} ${
                className ? className : ""
            }`}
            {...buttonProps}
        >
            {children}
        </Button>
    );
}

export default SecondaryButton;
