import React from "react";
import styles from "./index.module.scss";
import RadioSvg from "../../icons/24/RadioSvg";

function LocationCard({ address }) {
    return (
        <div className={styles.LocationContainer}>
            <div className={styles.LocationContainerIcon}>
                <RadioSvg borderColor="#fb6514" />
            </div>
            <span>{address}</span>
        </div>
    );
}

export default LocationCard;
