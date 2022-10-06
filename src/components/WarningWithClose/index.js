import React from "react";
import Warning from "../Warning";
import CloseSvg from "../icons/24/CloseSvg";

import styles from "./index.module.scss";

function WarningWithClose({ text, onClose }) {
    return (
        <div className={styles.WarningWithCloseContainer}>
            <Warning text={text} />
            {typeof onClose === "function" && (
                <div
                    className={styles.WarningWithCloseIconContainer}
                    onClick={onClose}
                >
                    <CloseSvg />
                </div>
            )}
        </div>
    );
}

export default WarningWithClose;
