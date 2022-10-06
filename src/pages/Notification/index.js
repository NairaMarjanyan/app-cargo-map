import React from "react";
import styles from "./index.module.scss";
import ToggleIndicator from "./ToggleIndicator";

function Notification() {
    return (
        <div className={styles.Notification}>
            <p className={styles.Title}>Уведомления</p>
            <div className={styles.Content}>
                <p className={styles.Text}>
                    Звуковое оповещение о новых предложениях
                </p>
                <ToggleIndicator />
            </div>
            <div className={styles.Content}>
                <p className={styles.Text}>Новое предложение на маршрутах</p>
                <ToggleIndicator />
            </div>
        </div>
    );
}

export default Notification;
