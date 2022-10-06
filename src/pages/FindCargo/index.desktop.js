import React, { useEffect, useState } from "react";
import CargosMapView from "../../components/CargosMapView";
import NavBar from "../../components/NavBar";
import FilterSvg from "../../components/icons/24/FilterSvg";
import WarningWithClose from "../../components/WarningWithClose";
import MapListButton from "../../components/MapListButton";
import ChevronSvg from "../../components/icons/24/ChevronSvg";
import Input from "../../components/UI/Input";
import SideBar from "../../components/UI/SideBar";
import sharedClasses from "./shared.module.scss";
import desktopClasses from "./desktop.module.scss";
import useFindCargoPageData from "./useFindCargoPageData";
import ViewCargo from "../../components/ViewCargo";
import CargoList from "../../components/CargoList";
import UpdateSvg from "../../components/icons/24/UpdateSvg";
import ExpiredItemsContainer from "../../components/ExpiredItemsContainer";
import Modal from "../../components/UI/Modal";
import ExpiredVehicleCard from "../../components/ExpiredVehicleCard";

const styles = {
    ...sharedClasses,
    ...desktopClasses
};

const FindCargo = ({ onAddCompany, companiesInfo, isSmallView }) => {
    const [isCargoListVisible, setIsCargoListVisible] = useState(!isSmallView);

    useEffect(() => {
        if (isSmallView) {
            setIsCargoListVisible(false);
        }
    }, [isSmallView]);

    function handleToggleView() {
        setIsCargoListVisible((isVisible) => !isVisible);
    }

    const {
        cargos,
        vehiclesOnMap,
        expiredVehiclesOnMap,
        isWarningVisible,
        warningText,
        mapRef,
        actions,
        handleCloseWarningMessage,
        handleClickOnCard,
        handleClickOnLocationItem,
        selectedCargo,
        handleCloseSideBar,
        isUpdateExpiredCargosModalOpen,
        handleUpdateExpiredCargosModalClose,
        removeMyVehicleFromMap,
        updateMyVehicleOnMap
    } = useFindCargoPageData({ companiesInfo, onAddCompany });
    return (
        <div className={styles.FindTruck}>
            <div className={styles.NavBarContainer}>
                <NavBar actions={actions}>
                    <Input
                        placeholder="search by location"
                        name="locationIcon"
                        size="small"
                        startIconComponent={FilterSvg}
                    />
                </NavBar>
            </div>

            {isWarningVisible && (
                <div className={styles.AlertWarningContainer}>
                    <WarningWithClose
                        onClose={handleCloseWarningMessage}
                        text={warningText}
                    />
                </div>
            )}

            <div className={styles.MapContainer}>
                <div
                    className={`${styles.TrackListContainer} ${
                        isCargoListVisible ? styles.IsVisible : ""
                    }`}
                >
                    <CargoList
                        cargos={cargos}
                        onClick={handleClickOnCard}
                        onLocationClick={handleClickOnLocationItem}
                    />
                    <div
                        onClick={handleToggleView}
                        className={styles.ToggleViewButton}
                    >
                        <MapListButton
                            isOpen={isCargoListVisible}
                            text={isCargoListVisible ? "" : "Show List"}
                        >
                            <ChevronSvg />
                        </MapListButton>
                    </div>
                </div>
                <CargosMapView
                    cargos={cargos}
                    vehicles={vehiclesOnMap}
                    ref={mapRef}
                    onCardClick={handleClickOnCard}
                />
            </div>

            <SideBar
                title="CARGO"
                onClose={handleCloseSideBar}
                isOpen={Boolean(selectedCargo)}
                position="right"
            >
                <div className={styles.TruckViewContent}>
                    {selectedCargo && <ViewCargo cargoInfo={selectedCargo} />}
                </div>
            </SideBar>
            <Modal
                isOpen={isUpdateExpiredCargosModalOpen}
                title=" Обновить просроченные заявки на транспорт"
                iconComponent={UpdateSvg}
                onClose={handleUpdateExpiredCargosModalClose}
            >
                <ExpiredItemsContainer
                    onClose={handleUpdateExpiredCargosModalClose}
                >
                    {expiredVehiclesOnMap.map((vehicle) => {
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
                </ExpiredItemsContainer>
            </Modal>
        </div>
    );
};

export default FindCargo;
