import React from "react";
import InfoBlock from "../../InfoBlock";

import styles from "./index.module.scss";

function AdditionalInfo({ cargoInfo }) {
    const loadings = cargoInfo.loadings ? cargoInfo.loadings.join(", ") : "";
    return (
        <div className={styles.AdditionalInfo}>
            <h2 className={styles.Title}>Vehicle</h2>
            <div className={styles.Row}>
                <InfoBlock title="Type" text={cargoInfo.packings.type || ""} />
                <InfoBlock title="Loading" text={loadings} />
                <InfoBlock title="Permit" text={cargoInfo.permit || ""} />
                <InfoBlock title="ADR" text={cargoInfo.adr || ""} />
            </div>
            <div className={styles.NotesContainer}>
                <h2 className={styles.NotesTitle}>Notes</h2>
                <p className={styles.Text}>{cargoInfo.notes}</p>
            </div>
        </div>
    );
}

export default AdditionalInfo;
