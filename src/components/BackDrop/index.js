import React from "react";
import styles from "./index.module.scss";

function BackDrop({ children, onClick }) {
    return (
        <div onClick={onClick} className={styles.BackDrop}>
            {children}
        </div>
    );
}

export default BackDrop;
