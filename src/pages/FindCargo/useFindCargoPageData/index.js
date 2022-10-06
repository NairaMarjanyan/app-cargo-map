import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlusSvg from "../../../components/icons/24/PlusSvg";
import L from "leaflet";
import useCargosOnMapStore from "../../../store/hooks/useCargosOnMapStore";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../../utils/notifications";
import useMyVehiclesOnMap from "../../../store/hooks/useMyVehiclesOnMap";

const useFindCargoPageData = ({ onAddCompany, companiesInfo }) => {
    const [isWarningVisible, setIsWarningVisible] = useState(true);
    const [isUpdateExpiredCargosModalOpen, setIsUpdateExpiredCargosModalOpen] =
        useState(false);

    const mapRef = useRef(null);
    const isUpdateModalStateDefinedRef = useRef(false);

    const {
        cargosOnMap: cargos,
        getCargosOnMap,
        setSelectedCargo,
        selectedCargo
    } = useCargosOnMapStore();

    const {
        myVehiclesOnMap,
        getMyVehiclesOnMap,
        myExpiredVehiclesOnMap: expiredVehiclesOnMap,
        removeMyVehicleFromMap: deleteVehicleFromMap,
        updateMyVehicleOnMap: updateMyVehicleOnMapAction
    } = useMyVehiclesOnMap();

    const navigate = useNavigate();

    //TODO fix functions after company data implementation
    //TODO check vehicles length for this
    const actions = useMemo(() => {
        if (companiesInfo.vehicleCompanies.length === 0) {
            return [];
        }
        return [
            {
                name: "Add Vehicle",
                iconComponent: PlusSvg,
                onClick: () => {
                    navigate({
                        pathname: "/add-vehicle"
                    });
                }
            }
        ];
    }, [navigate, companiesInfo.vehicleCompanies]);

    useEffect(() => {
        Promise.all([getCargosOnMap(), getMyVehiclesOnMap()]).catch((error) => {
            console.log("error: ", error);
            showErrorNotification("Something went wrong");
        });
        return () => {
            mapRef.current = null;
        };
    }, [getCargosOnMap, getMyVehiclesOnMap]);

    function handleCloseWarningMessage() {
        setIsWarningVisible(false);
    }

    const {
        loadCompanies,
        expediterCompanies,
        hasVerifiedLoadCompany,
        hasVerifiedExpediterCompany
    } = companiesInfo;

    const hasCompanies =
        loadCompanies.length > 0 || expediterCompanies.length > 0;

    const hasVerifiedCompany =
        hasVerifiedLoadCompany || hasVerifiedExpediterCompany;

    let warningText = "";
    if (hasCompanies) {
        warningText =
            "Some services are unavailable to you yet. Our managers have to check new registrations. If everything is OK, you will soon be able to use our services";
    } else if (!hasVerifiedCompany) {
        warningText =
            "Some services are unavailable to you yet. Please Add Company in order to use all services";
    }

    const handleClickOnCargo = useCallback(
        (cargo) => {
            setSelectedCargo(cargo.id);
        },
        [setSelectedCargo]
    );

    const handleCloseSideBar = useCallback(() => {
        setSelectedCargo(null);
    }, [setSelectedCargo]);

    function handleClickOnCard(e, cargo) {
        if (!hasCompanies) {
            e.stopPropagation();
            onAddCompany();
        } else {
            handleClickOnCargo(cargo);
        }
    }

    function handleClickOnLocationItem(lat, long) {
        if (!hasCompanies) {
            return;
        }
        if (!mapRef.current?.mapInstance) {
            return;
        }
        mapRef.current?.mapInstance.flyTo(L.latLng(lat, long), 15, {
            duration: 3
        });
    }

    function handleUpdateExpiredCargosModalClose() {
        setIsUpdateExpiredCargosModalOpen(false);
    }

    const removeMyVehicleFromMap = useCallback(
        async (id) => {
            try {
                await deleteVehicleFromMap(id);
                showSuccessNotification(
                    "Vehicle successfully removed from the map."
                );
            } catch (e) {
                console.error(e);
                showErrorNotification("Something went wrong.");
            }
        },
        [deleteVehicleFromMap]
    );

    const updateMyVehicleOnMap = useCallback(
        async (id) => {
            try {
                await updateMyVehicleOnMapAction(id);
                showSuccessNotification("Vehicle successfully updated.");
            } catch (e) {
                console.error(e);
                showErrorNotification("Something went wrong.");
            }
        },
        [updateMyVehicleOnMapAction]
    );

    useEffect(() => {
        if (expiredVehiclesOnMap.length === 0) {
            setIsUpdateExpiredCargosModalOpen(false);
            return;
        }

        if (isUpdateModalStateDefinedRef.current) {
            return;
        }

        if (expiredVehiclesOnMap.length > 0) {
            isUpdateModalStateDefinedRef.current = true;
            setIsUpdateExpiredCargosModalOpen(true);
        }
    }, [expiredVehiclesOnMap]);

    return {
        cargos,
        vehiclesOnMap: myVehiclesOnMap,
        expiredVehiclesOnMap,
        isWarningVisible,
        warningText,
        selectedCargo,
        handleClickOnCargo,
        handleCloseSideBar,
        actions,
        mapRef,
        isUpdateExpiredCargosModalOpen,
        handleUpdateExpiredCargosModalClose,
        handleCloseWarningMessage,
        handleClickOnCard,
        handleClickOnLocationItem,
        removeMyVehicleFromMap,
        updateMyVehicleOnMap
    };
};

export default useFindCargoPageData;
