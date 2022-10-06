import React from "react";
import WarningSvg from "../icons/24/WarningSvg";
import styles from "./index.module.scss";

function InfoMessage({ children }) {
    return (
        <div className={styles.InfoContainer}>
            <div className={styles.WorningLogo}>
                <div>
                    <WarningSvg />
                </div>
            </div>
            <p className={styles.InfoContainerMessage}>{children}</p>
        </div>
    );
}

export default InfoMessage;
