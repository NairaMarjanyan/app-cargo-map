import React from "react";
import TargetSvg from "../icons/24/TargetSvg";

import styles from "./index.module.scss";
// todo check if no need remove
const Location = ({ title, address }) => {
    return (
        <div className={styles.Location}>
            <span className={styles.IconContainer}>
                <TargetSvg />
            </span>
            <div>
                <p className={styles.Title}>{title}</p>
                <p className={styles.Address}>{address}</p>
            </div>
        </div>
    );
};

export default Location;
