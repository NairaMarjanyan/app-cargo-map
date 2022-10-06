import React from "react";
import Characteristic from "../Characteristic";
import KgSvg from "../icons/24/KgSvg";
import TriangleWarningSvg from "../icons/24/TriangleWarningSvg";
import IconWrapper from "../IconWrapper";
import LocationsCard from "../LocationsCard";
import CargoSvg from "../icons/24/CargoSvg";

import styles from "./index.module.scss";
import TargetSvg from "../icons/24/TargetSvg";

const CargoCard = ({
    type,
    fromAddress,
    toAddress,
    weight,
    adr,
    onClick,
    onLocationClick,
    hideLocation = false
}) => {
    return (
        <div className={styles.TruckCard} onClick={onClick}>
            <div className={styles.Header}>
                <p className={styles.HeaderText}>{type}</p>
                <div className={styles.Icon}>
                    <CargoSvg />
                </div>
            </div>
            <LocationsCard address1={fromAddress} address2={toAddress} />
            <div className={styles.CharacteristicInfoContainer}>
                <div className={styles.InfoContainer}>
                    <Characteristic text={weight}>
                        <KgSvg />
                    </Characteristic>
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

export default CargoCard;
