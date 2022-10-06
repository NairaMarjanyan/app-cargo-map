import React from "react";
import RecycleBinSvg from "../icons/24/RecycleBinSvg";
import LocationsCard from "../LocationsCard";
import SecondaryButton from "../UI/SecondaryButton";

import styles from "./index.module.scss";

function ExpiredCard({
    id,
    fromAddress,
    toAddress,
    category,
    onUpdate,
    onDelete,
    children
}) {
    function handleDelete() {
        onDelete(id);
    }
    function handleUpdate() {
        onUpdate(id);
    }
    return (
        <div className={styles.ExpiredCard}>
            <div className={styles.Content}>
                <div className={styles.Header}>
                    <div className={styles.HeaderLeft}>
                        <div className={styles.Icon}>{children}</div>
                        <h2>{category}</h2>
                    </div>
                    <div className={styles.HeaderRight}>
                        <SecondaryButton onClick={handleUpdate}>
                            Обновить
                        </SecondaryButton>
                        <div
                            className={styles.DeleteIcon}
                            onClick={handleDelete}
                        >
                            <RecycleBinSvg />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.Content}>
                <LocationsCard
                    address1={fromAddress}
                    address2={toAddress}
                    borderBottomStyle="none"
                />
            </div>
        </div>
    );
}

export default ExpiredCard;
