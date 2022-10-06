import React from "react";
import InfoBlock from "../../InfoBlock";
import BagSvg from "../../icons/24/BagSvg";
import LocationSvg from "../../icons/40/LocationSvg";
import TelSvg from "../../icons/24/TelSvg";
import DateSvg from "../../icons/24/DateSvg";
import UserSvg from "../../icons/24/UserSvg";
import VehicleSvg from "../../icons/48/VehicleSvg";
import { formatDate } from "../../../utils/helpers";

import styles from "./index.module.scss";

function GeneralInfo({ vehicleInfo }) {
    const formattedAvailabilityDate = formatDate(
        vehicleInfo.location.availabilityDate
    );

    const totalLoadCapacity =
        vehicleInfo.bodyDimensions.loadCapacity +
        vehicleInfo.trailerDimensions.loadCapacity;

    const loadedPercent = Math.floor(
        (vehicleInfo.location.loaded / totalLoadCapacity) * 100
    );

    const totalLoadCapacityToDisplay = `${totalLoadCapacity} t`;

    const totalVolume = `${
        vehicleInfo.bodyDimensions.volume + vehicleInfo.trailerDimensions.volume
    } m3`;

    const length = vehicleInfo.bodyDimensions.length
        ? `${vehicleInfo.bodyDimensions.length} m`
        : "";
    const width = vehicleInfo.bodyDimensions.width
        ? `${vehicleInfo.bodyDimensions.width} m`
        : "";
    const height = vehicleInfo.bodyDimensions.height
        ? `${vehicleInfo.bodyDimensions.height} m`
        : "";
    const volume = vehicleInfo.bodyDimensions.volume
        ? `${vehicleInfo.bodyDimensions.volume} m3`
        : "";
    const loadings = vehicleInfo.loadings
        ? vehicleInfo.loadings.join(", ")
        : "";
    const lengthTrailer = vehicleInfo.trailerDimensions.length
        ? `${vehicleInfo.trailerDimensions.length} m`
        : 0;
    const widthTrailer = vehicleInfo.trailerDimensions.width
        ? `${vehicleInfo.trailerDimensions.width} m`
        : 0;
    const heightTrailer = vehicleInfo.trailerDimensions.height
        ? `${vehicleInfo.trailerDimensions.height} m`
        : 0;
    const volumeTrailer = vehicleInfo.trailerDimensions.volume
        ? `${vehicleInfo.trailerDimensions.volume} m3`
        : 0;

    return (
        <div className={styles.GeneralInfo}>
            <h2 className={styles.Title}>Main Info</h2>
            <div className={styles.MainInfoContainer}>
                <div className={styles.InfoBlock}>
                    <InfoBlock title="Company" text={vehicleInfo.company || ""}>
                        <BagSvg />
                    </InfoBlock>
                    <InfoBlock
                        title="Availability Date "
                        text={formattedAvailabilityDate || ""}
                    >
                        <DateSvg />
                    </InfoBlock>
                </div>
                <div className={styles.InfoBlock}>
                    <InfoBlock
                        title="From"
                        text={vehicleInfo.location.fromAddress || ""}
                    >
                        <LocationSvg />
                    </InfoBlock>
                    <InfoBlock
                        title="To"
                        text={vehicleInfo.location.toAddress || ""}
                    >
                        <LocationSvg />
                    </InfoBlock>
                </div>
                <div className={styles.InfoBlock}>
                    <InfoBlock
                        title="Phone Number"
                        text={vehicleInfo.location.contactPhone || ""}
                    >
                        <TelSvg />
                    </InfoBlock>
                    <InfoBlock
                        title="Contact person"
                        text={vehicleInfo.location.contactPersonName || ""}
                    >
                        <UserSvg />
                    </InfoBlock>
                </div>
            </div>

            <h2 className={styles.CapacityTitle}>Capacity</h2>
            <div className={styles.LogoContainer}>
                <VehicleSvg capacity={loadedPercent || 0} />
            </div>
            <div className={styles.CapacityContainer}>
                <InfoBlock
                    title="Load Capacity"
                    text={totalLoadCapacityToDisplay || 0}
                />
                <InfoBlock title="Volume (m3)" text={totalVolume || ""} />
            </div>

            <h2 className={styles.TruckTitle}>Body Dimensions</h2>
            <div className={styles.VehicleInfoContainer}>
                <div className={styles.InfoBlockDimensions}>
                    <div className={styles.InfoBlockWrapper}>
                        <InfoBlock title="Length" text={length} />
                    </div>
                    <div className={styles.InfoBlockWrapper}>
                        <InfoBlock title="Width" text={width} />
                    </div>
                    <div className={styles.InfoBlockWrapper}>
                        <InfoBlock title="Height" text={height} />
                    </div>
                    <div className={styles.InfoBlockWrapper}>
                        <InfoBlock title="Volume" text={volume} />
                    </div>
                </div>

                {vehicleInfo.trailerDimensions && (
                    <>
                        <h2 className={styles.TrailerTitle}>
                            Trailer Dimensions
                        </h2>
                        <div className={styles.VehicleInfoContainer}>
                            <div className={styles.InfoBlockDimensions}>
                                <div className={styles.InfoBlockWrapper}>
                                    <InfoBlock
                                        title="Length"
                                        text={lengthTrailer}
                                    />
                                </div>
                                <div className={styles.InfoBlockWrapper}>
                                    <InfoBlock
                                        title="Width"
                                        text={widthTrailer}
                                    />
                                </div>
                                <div className={styles.InfoBlockWrapper}>
                                    <InfoBlock
                                        title="Height"
                                        text={heightTrailer}
                                    />
                                </div>
                                <div className={styles.InfoBlockWrapper}>
                                    <InfoBlock
                                        title="Volume"
                                        text={volumeTrailer}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className={styles.InfoBlockWithDocuments}>
                    <InfoBlock
                        title="Car Number"
                        text={vehicleInfo.carNumber || ""}
                    />
                    <InfoBlock
                        title="VIN Number"
                        text={vehicleInfo.vinNumber || ""}
                    />
                </div>
                <div className={styles.CarInfoBlock}>
                    <InfoBlock title="Loading" text={loadings} />
                    <InfoBlock title="ADR" text={vehicleInfo.adr || ""} />
                    <InfoBlock title="Permit" text={vehicleInfo.permit || ""} />
                </div>
            </div>
        </div>
    );
}

export default GeneralInfo;
