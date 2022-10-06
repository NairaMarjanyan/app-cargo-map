import React from "react";
import styles from "./index.module.scss";

function MapListButton({ isOpen, children, text }) {
    return (
        <div className={styles.MapListButtonContainer}>
            <span className={styles.Text}>{text}</span>
            <div
                className={`${styles.Icon} ${
                    isOpen ? styles.RotateLeft : styles.RotateRight
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export default MapListButton;
