import React from "react";
import styles from "./index.module.scss";

function VehicleImage({ url, alt }) {
    return (
        <div className={styles.Image}>
            <img src={url} alt={alt} />
        </div>
    );
}

export default VehicleImage;
