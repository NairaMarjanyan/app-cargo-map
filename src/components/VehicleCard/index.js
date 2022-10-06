import React from "react";
import Characteristic from "../Characteristic";
import KgSvg from "../icons/24/KgSvg";
import TriangleWarningSvg from "../icons/24/TriangleWarningSvg";
import IconWrapper from "../IconWrapper";
import LocationsCard from "../LocationsCard";
import CharacteristicWithProgress from "../CharacteristicWithProgress";
import TargetSvg from "../icons/24/TargetSvg";

import styles from "./index.module.scss";
import useTruckIcon from "../../hooks/useVehicleIcon";

const TruckCard = ({
    category,
    fromAddress,
    toAddress,
    capacity,
    loaded = 0,
    adr,
    onClick,
    onLocationClick,
    hideLocation = false
}) => {
    const TruckIcon = useTruckIcon(category);

    return (
        <div className={styles.TruckCard} onClick={onClick}>
            <div className={styles.Header}>
                <p className={styles.HeaderText}>{category}</p>
                <div className={styles.Icon}>
                    <TruckIcon />
                </div>
            </div>
            <LocationsCard address1={fromAddress} address2={toAddress} />
            <div className={styles.CharacteristicInfoContainer}>
                <div className={styles.InfoContainer}>
                    <CharacteristicWithProgress
                        capacity={capacity}
                        loaded={loaded}
                    >
                        <KgSvg />
                    </CharacteristicWithProgress>
                    <Characteristic text={adr}>
                        <TriangleWarningSvg />
                    </Characteristic>
                </div>
                {!hideLocation && (
                    <div
                        className={styles.LogoContainer}
                        onClick={onLocationClick}
                    >
                        <IconWrapper borderRadius={10} padding="15%">
                            <TargetSvg />
                        </IconWrapper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TruckCard;
