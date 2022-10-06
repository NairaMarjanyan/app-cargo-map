import React from "react";
import styles from "./index.module.scss";
import SuccessSvg from "../../../components/icons/48/SuccessSvg";

function SuccessFrame({ title, text, children }) {
    return (
        <div className={styles.SuccessFrame}>
            <div className={styles.Logo}>
                <SuccessSvg />
            </div>
            <h2 className={styles.Title}>{title}</h2>
            <p className={styles.Text}>{text}</p>
            {children}
        </div>
    );
}

export default SuccessFrame;
