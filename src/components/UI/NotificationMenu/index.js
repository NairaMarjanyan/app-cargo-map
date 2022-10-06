import React from "react";
import Menu from "@mui/material/Menu";
import ExpiredCargoCard from "../../ExpiredCargoCard";
import ExpiredVehicleCard from "../../ExpiredVehicleCard";
import styles from "./index.module.scss";
import useAnchorElState from "../../../hooks/useAnchorElState";

function NotificationMenu({
    children,
    isFullWidth,
    myExpiredCargosOnMap,
    myExpiredVehiclesOnMap,
    updateMyCargoOnMap,
    updateMyVehicleOnMap,
    removeMyCargoFromMap,
    removeMyVehicleFromMap
}) {
    const {
        anchorEl,
        onClick: handleClick,
        onClose: handleClose,
        isOpen
    } = useAnchorElState();

    return (
        <div
            className={`${styles.PopupMenu} ${
                isFullWidth ? styles.FullWidth : ""
            }`}
        >
            <div onClick={handleClick} className={styles.IconContainer}>
                {children}
            </div>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClick={handleClose}
                disablePortal
            >
                {myExpiredCargosOnMap.map((cargo) => {
                    return (
                        <ExpiredCargoCard
                            key={cargo.id}
                            id={cargo.id}
                            type={cargo.type}
                            fromAddress={cargo.fromAddress}
                            toAddress={cargo.toAddress}
                            onDelete={removeMyCargoFromMap}
                            onUpdate={updateMyCargoOnMap}
                        />
                    );
                })}
                {myExpiredVehiclesOnMap.map((vehicle) => {
                    return (
                        <ExpiredVehicleCard
                            key={vehicle.id}
                            id={vehicle.id}
                            category={vehicle.category}
                            fromAddress={vehicle.fromAddress}
                            toAddress={vehicle.toAddress}
                            onDelete={removeMyVehicleFromMap}
                            onUpdate={updateMyVehicleOnMap}
                        />
                    );
                })}
            </Menu>
        </div>
    );
}

export default NotificationMenu;
