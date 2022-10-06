import React from "react";
import LocationCard from "./LocationCard";

import styles from "./index.module.scss";

function LocationsCard({ address1, address2, borderBottomStyle }) {
    return (
        <div
            className={styles.LocationsContainer}
            style={{ borderBottomStyle }}
        >
            <LocationCard address={address1} />
            {address2 && (
                <>
                    <div className={styles.RouteWrapper}>
                        <div className={styles.Route} />
                    </div>
                    <LocationCard address={address2} />
                </>
            )}
        </div>
    );
}

export default LocationsCard;
