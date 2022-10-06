import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import FilterItem from "./../../components/NavBar/FilterItem/index";
import FilterSvg from "../../components/icons/24/FilterSvg";
import TrackList from "../../components/TrackList";
import WarningWithClose from "../../components/WarningWithClose";
import DropdownMenu from "../../components/UI/DropdownMenu";
import Input from "../../components/UI/Input";
import SideBar from "../../components/UI/SideBar";
import ViewVehicle from "../../components/ViewVehicle";
import MobileViewSwitcher from "../../components/UI/MobileViewSwitcher";
import { VEHICLE_TYPE_OPTIONS } from "../../utils/constants";
import useFilter from "../../hooks/useFilter";
import Modal from "../../components/UI/Modal";
import UpdateSvg from "../../components/icons/24/UpdateSvg";
import ExpiredItemsContainer from "../../components/ExpiredItemsContainer";
import ExpiredCargoCard from "../../components/ExpiredCargoCard";
import useFindVehiclePageData from "./useFindVehiclePageData";
import VehiclesMapView from "../../components/VehiclesMapView";

import sharedClasses from "./shared.module.scss";
import mobileClasses from "./mobile.module.scss";

const styles = {
    ...sharedClasses,
    ...mobileClasses
};

const FindVehicle = ({ onAddCompany, companiesInfo }) => {
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
    } = useFindVehiclePageData({ onAddCompany, companiesInfo });

    const [filter, handleFilterChange] = useFilter({ truckTypes: [] });

    const [isMapView, setIsMapView] = useState(true);

    function handleMobileSwitcherClick(selectedView) {
        setIsMapView(selectedView === "map-view");
    }

    function handleCardsLocationClick(...args) {
        setIsMapView(true);
        handleClickOnLocationItem(...args);
    }

    return (
        <div className={styles.FindTruck}>
            <div className={styles.NavBarContainer}>
                <NavBar actions={actions}>
                    <Input
                        defaultValue="Russia, Volgograd"
                        name="locationIcon"
                        size="small"
                        startIconComponent={FilterSvg}
                    />
                    <div className={styles.DropdownContainer}>
                        <DropdownMenu
                            selectedItems={filter.truckTypes}
                            items={VEHICLE_TYPE_OPTIONS}
                            placeHolder="Truck Type"
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
                <VehiclesMapView
                    vehicles={vehicles}
                    ref={mapRef}
                    cargos={myCargosOnMap}
                    onCardClick={handleClickOnCard}
                />
                {!isMapView && (
                    <div className={styles.TrackListContainer}>
                        <TrackList
                            trucks={vehicles}
                            onClick={handleClickOnCard}
                            onLocationClick={handleCardsLocationClick}
                        />
                    </div>
                )}
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

            <div className={styles.MobileViewSwitcherContainer}>
                <MobileViewSwitcher
                    onClick={handleMobileSwitcherClick}
                    activePage={isMapView ? "map-view" : "list-view"}
                />
            </div>

            <Modal
                isOpen={isUpdateExpiredCargosModalOpen}
                title="Update Expired Cargos"
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
