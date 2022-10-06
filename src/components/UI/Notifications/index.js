import React from "react";
import BellSvg from "../../icons/24/BellSvg";
import styles from "./index.module.scss";

const Notifications = ({ notificationCount }) => {
    return (
        <div className={styles.NotificationsBell}>
            <BellSvg />
            {notificationCount > 0 && (
                <div className={styles.Notifications}>{notificationCount}</div>
            )}
        </div>
    );
};
export default Notifications;
