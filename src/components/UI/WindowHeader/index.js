import React from "react";
import styles from "./index.module.scss";
import CloseSvg from "../../icons/24/CloseSvg";

function WindowHeader({ title, children, onClose }) {
    return (
        <div className={styles.ModalHeaderContainer}>
            <div className={styles.ModalHeaderMenu}>
                {children && (
                    <div className={styles.ModalHeaderCubicSvg}>{children}</div>
                )}
                {title && <p className={styles.ModalHeaderTitle}>{title}</p>}
            </div>
            <div className={styles.ModalHeaderCloseSvg} onClick={onClose}>
                <CloseSvg />
            </div>
        </div>
    );
}

export default WindowHeader;
