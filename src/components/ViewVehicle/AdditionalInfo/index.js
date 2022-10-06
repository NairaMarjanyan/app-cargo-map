import React from "react";
import VehicleImage from "./VehicleImage";

import styles from "./index.module.scss";

function AdditionalInfo({ vehicleInfo }) {
    return (
        <div className={styles.AdditionalInfo}>
            <h2 className={styles.Title}>Vehicle Images</h2>
            <div className={styles.VehicleImagesInfo}>
                <div className={styles.ImagesContainer}>
                    {vehicleInfo.images.map((image) => {
                        return (
                            <div key={image.id}>
                                <VehicleImage
                                    url={image.fileUrl}
                                    alt="Vehicle image"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.NotesContainer}>
                <h2 className={styles.NotesTitle}>Notes</h2>
                <p className={styles.Text}>{vehicleInfo.location.notes}</p>
            </div>
        </div>
    );
}

export default AdditionalInfo;
