import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import FilterItem from "./../../components/NavBar/FilterItem/index";
import FilterSvg from "../../components/icons/24/FilterSvg";
import TrackList from "../../components/TrackList";
import WarningWithClose from "../../components/WarningWithClose";
import MapListButton from "../../components/MapListButton";
import ChevronSvg from "../../components/icons/24/ChevronSvg";
import DropdownMenu from "../../components/UI/DropdownMenu";
import Input from "../../components/UI/Input";
import SideBar from "../../components/UI/SideBar";
import sharedClasses from "./shared.module.scss";
import desktopClasses from "./desktop.module.scss";
import { VEHICLE_TYPE_OPTIONS } from "../../utils/constants";
import useFilter from "../../hooks/useFilter";
import Modal from "../../components/UI/Modal";
import UpdateSvg from "../../components/icons/24/UpdateSvg";
import ExpiredItemsContainer from "../../components/ExpiredItemsContainer";
import ExpiredCargoCard from "../../components/ExpiredCargoCard";
import useFindVehiclePageData from "./useFindVehiclePageData";
import VehiclesMapView from "../../components/VehiclesMapView";
import ViewVehicle from "../../components/ViewVehicle";

const styles = {
    ...sharedClasses,
    ...desktopClasses
};

const FindVehicle = ({ onAddCompany, companiesInfo, isSmallView }) => {
    const [isTruckListVisible, setIsTruckListVisible] = useState(!isSmallView);

    const [filter, handleFilterChange] = useFilter({ truckTypes: [] });

    useEffect(() => {
        if (isSmallView) {
            setIsTruckListVisible(false);
        }
    }, [isSmallView]);

    function handleToggleView() {
        setIsTruckListVisible((isVisible) => !isVisible);
    }

    const {
        vehicles,
        expiredCargosOnMap,
        myCargosOnMap,
        isWarningVisible,
        warningText,
        mapRef,
        actions,
        handleCloseWarningMessage,
        handleClickOnCard,
        handleClickOnLocationItem,
        isUpdateExpiredCargosModalOpen,
        handleUpdateExpiredCargosModalClose,
        removeMyCargoFromMap,
        updateMyCargoOnMap,
        selectedVehicle,
        handleCloseSideBar
    } = useFindVehiclePageData({ companiesInfo, onAddCompany });

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
                    <div className={styles.DropdownContainer}>
                        <DropdownMenu
                            selectedItems={filter.truckTypes}
                            items={VEHICLE_TYPE_OPTIONS}
                            placeHolder="Vehicle Type"
                            name="truckTypes"
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className={styles.FilterContainer}>
                        <FilterItem text="More Filters">
                            <FilterSvg
                                hasFilter={filter.truckTypes.length > 0}
                            />
                        </FilterItem>
                    </div>
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
                        isTruckListVisible ? styles.IsVisible : ""
                    }`}
                >
                    <TrackList
                        trucks={vehicles}
                        onClick={handleClickOnCard}
                        onLocationClick={handleClickOnLocationItem}
                    />
                    <div
                        onClick={handleToggleView}
                        className={styles.ToggleViewButton}
                    >
                        <MapListButton
                            isOpen={isTruckListVisible}
                            text={isTruckListVisible ? "" : "Show List"}
                        >
                            <ChevronSvg />
                        </MapListButton>
                    </div>
                </div>
                <VehiclesMapView
                    vehicles={vehicles}
                    cargos={myCargosOnMap}
                    ref={mapRef}
                    onCardClick={handleClickOnCard}
                />
            </div>

            <SideBar
                title="VEHICLE"
                onClose={handleCloseSideBar}
                isOpen={Boolean(selectedVehicle)}
                position="right"
            >
                <div className={styles.TruckViewContent}>
                    {selectedVehicle && (
                        <ViewVehicle vehicleInfo={selectedVehicle} />
                    )}
                </div>
            </SideBar>

            <Modal
                isOpen={isUpdateExpiredCargosModalOpen}
                title="Обновить просроченные заявки на груз"
                iconComponent={UpdateSvg}
                onClose={handleUpdateExpiredCargosModalClose}
            >
                <ExpiredItemsContainer
                    onClose={handleUpdateExpiredCargosModalClose}
                >
                    {expiredCargosOnMap.map((cargo) => {
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
                </ExpiredItemsContainer>
            </Modal>
        </div>
    );
};

export default FindVehicle;
