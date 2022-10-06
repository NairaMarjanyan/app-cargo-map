import React from "react";
import InfoBlock from "../../InfoBlock";
import BagSvg from "../../icons/24/BagSvg";
import DateSvg from "../../icons/24/DateSvg";
import LocationSvg from "../../icons/40/LocationSvg";
import ClosableCard from "../../ClosableCard";
import { formatDate } from "../../../utils/helpers";

import styles from "./index.module.scss";

function GeneralInfo({ cargoInfo }) {
    const formattedAvailabilityDate = formatDate(cargoInfo.availabilityDate);

    return (
        <div className={styles.GeneralInfo}>
            <h2 className={styles.Title}>Main Info</h2>
            <div className={styles.MainInfoRow}>
                <InfoBlock title="Company" text={cargoInfo.companyName || ""}>
                    <BagSvg />
                </InfoBlock>
                <InfoBlock
                    title="Availability Date"
                    text={formattedAvailabilityDate || ""}
                >
                    <DateSvg />
                </InfoBlock>
            </div>
            <div className={styles.MainInfoRow}>
                <InfoBlock title="From" text={cargoInfo.fromAddress || ""}>
                    <LocationSvg />
                </InfoBlock>
                <InfoBlock title="To" text={cargoInfo.toAddress || ""}>
                    <LocationSvg />
                </InfoBlock>
            </div>
            <h2 className={styles.CargoTitle}>Cargo</h2>
            <div className={styles.MainInfoRow}>
                <InfoBlock title="Type" text={cargoInfo.cargoType.name || ""} />
                <InfoBlock title="ADR" text={cargoInfo.adr || ""} />
            </div>

            <h2 className={styles.PackingTitle}>Packing</h2>
            <div>
                {cargoInfo.packings.map((pallet) => {
                    const weight = pallet.weight ? `${pallet.weight} kg` : "";
                    const volume = pallet.volume ? `${pallet.volume} m3` : "";
                    const height = pallet.height ? `${pallet.height} m` : "";
                    const width = pallet.width ? `${pallet.width} m` : "";
                    const length = pallet.length ? `${pallet.length} m` : "";
                    return (
                        <div key={pallet.id}>
                            <ClosableCard title={pallet.type}>
                                <div className={styles.MainInfoRow}>
                                    <InfoBlock
                                        title="Pallets"
                                        text={pallet.palletType || ""}
                                    />
                                    <InfoBlock
                                        title="Quantity"
                                        text={pallet.quantity || ""}
                                    />
                                    <InfoBlock title="Weight" text={weight} />
                                    <InfoBlock title="Volume" text={volume} />
                                </div>
                                <div className={styles.Row}>
                                    <InfoBlock title="Height" text={height} />
                                    <InfoBlock title="Width" text={width} />
                                    <InfoBlock title="Length" text={length} />
                                </div>
                            </ClosableCard>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GeneralInfo;
