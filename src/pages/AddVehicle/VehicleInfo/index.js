import React from "react";
import InfoBlock from "../../../components/InfoBlock";
import styles from "./index.module.scss";

function VehicleInfo({ vehicleToDisplay }) {
    const imageUrl = vehicleToDisplay.images?.[0].fileUrl;

    return (
        <div className={styles.VehicleInfo}>
            <div className={styles.Image}>
                {imageUrl ? <img src={imageUrl} alt="Vehicle" /> : "No Image"}
            </div>
            <div className={styles.Info}>
                <div className={styles.Content}>
                    <InfoBlock
                        title="Loading"
                        text={vehicleToDisplay.loadings}
                    />
                    <InfoBlock title="Permit" text={vehicleToDisplay.permit} />
                    <InfoBlock title="ADR" text={vehicleToDisplay.adr} />
                </div>
                <div className={styles.Content}>
                    <InfoBlock
                        title="Car Number"
                        text={vehicleToDisplay.carNumber}
                    />
                    <InfoBlock
                        title="VIN Number"
                        text={vehicleToDisplay.vinNumber}
                    />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
}

export default VehicleInfo;
