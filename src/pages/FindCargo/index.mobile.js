import React, { useState } from "react";
import CargosMapView from "../../components/CargosMapView";
import NavBar from "../../components/NavBar";
import FilterItem from "./../../components/NavBar/FilterItem/index";
import FilterSvg from "../../components/icons/24/FilterSvg";
import WarningWithClose from "../../components/WarningWithClose";
import DropdownMenu from "../../components/UI/DropdownMenu";
import Input from "../../components/UI/Input";
import SideBar from "../../components/UI/SideBar";
import MobileViewSwitcher from "../../components/UI/MobileViewSwitcher";
import useFindCargoPageData from "./useFindCargoPageData";
import { VEHICLE_TYPE_OPTIONS } from "../../utils/constants";
import useFilter from "../../hooks/useFilter";
import ViewCargo from "../../components/ViewCargo";
import CargoList from "../../components/CargoList";
import UpdateSvg from "../../components/icons/24/UpdateSvg";
import ExpiredItemsContainer from "../../components/ExpiredItemsContainer";
import ExpiredVehicleCard from "../../components/ExpiredVehicleCard";
import Modal from "../../components/UI/Modal";

import sharedClasses from "./shared.module.scss";
import mobileClasses from "./mobile.module.scss";

const styles = {
    ...sharedClasses,
    ...mobileClasses
};

const FindCargo = ({ onAddCompany, companiesInfo }) => {
    const {
        cargos,
        vehiclesOnMap,
        expiredVehiclesOnMap,
        isWarningVisible,
        warningText,
        isSideBarVisible,
        mapRef,
        actions,
        handleCloseWarningMessage,
        handleClickOnMap,
        handleClickOnCard,
        handleClickOnLocationItem,
        toggleSideBarVisibility,
        isUpdateExpiredCargosModalOpen,
        handleUpdateExpiredCargosModalClose,
        removeMyVehicleFromMap,
        updateMyVehicleOnMap,
        selectedCargo
    } = useFindCargoPageData({ onAddCompany, companiesInfo });

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
                        defaultValue="Russia, Vogograd"
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
                            <FilterSvg circleColor="red" />
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
                <CargosMapView
                    cargos={cargos}
                    vehicles={vehiclesOnMap}
                    ref={mapRef}
                    onClick={handleClickOnMap}
                    onCardClick={handleClickOnCard}
                />
                {!isMapView && (
                    <div className={styles.TrackListContainer}>
                        <CargoList
                            cargos={cargos}
                            onClick={handleClickOnCard}
                            onLocationClick={handleCardsLocationClick}
                        />
                    </div>
                )}
            </div>

            <SideBar
                title="CARGO"
                onClose={toggleSideBarVisibility}
                isOpen={isSideBarVisible}
                position="right"
            >
                <div className={styles.TruckViewContent}>
                    {selectedCargo && <ViewCargo cargoInfo={selectedCargo} />}
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
