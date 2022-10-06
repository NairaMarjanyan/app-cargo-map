import React from "react";
import CloseSvg from "../icons/24/CloseSvg";

import styles from "./index.module.scss";

function ClosableCard({ children, onClose, title }) {
    return (
        <div className={styles.ClosableCard}>
            <div className={styles.Header}>
                <h1 className={styles.Title}>{title}</h1>
                <div className={styles.IconWrapper} onClick={onClose}>
                    <div className={styles.Icon}>
                        <CloseSvg />
                    </div>
                </div>
            </div>

            <div className={styles.ContentContainer}>{children}</div>
        </div>
    );
}

export default ClosableCard;
