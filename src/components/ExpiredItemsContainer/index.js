import React from "react";
import Button from "../../components/UI/Button";

import styles from "./index.module.scss";

function ExpiredItemsContainer({ children, onClose }) {
    return (
        <div className={styles.ExpiredItemsContainer}>
            <div className={styles.Content}>{children}</div>
            <div className={styles.ButtonsContainer}>
                <Button onClick={onClose}>
                    Нет необходимости в обновлении
                </Button>
            </div>
        </div>
    );
}

export default ExpiredItemsContainer;
