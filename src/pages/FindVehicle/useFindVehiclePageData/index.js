import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlusSvg from "../../../components/icons/24/PlusSvg";
import L from "leaflet";
import useVehiclesOnMapStore from "../../../store/hooks/useVehiclesOnMapStore";
import {
    showErrorNotification,
    showSuccessNotification
} from "../../../utils/notifications";
import useMyCargosOnMap from "../../../store/hooks/useMyCargosOnMap";

const useFindVehiclePageData = ({ onAddCompany, companiesInfo }) => {
    const [isWarningVisible, setIsWarningVisible] = useState(true);
    const [isUpdateExpiredCargosModalOpen, setIsUpdateExpiredCargosModalOpen] =
        useState(false);

    const mapRef = useRef(null);
    const isUpdateModalStateDefinedRef = useRef(false);

    const {
        vehiclesOnMap: vehicles,
        getVehiclesOnMap,
        selectedVehicle,
        setSelectedVehicle
    } = useVehiclesOnMapStore();

    const {
        myCargosOnMap,
        removeMyCargoFromMap: removeMyCargoFromMapAction,
        getMyCargosOnMap,
        myExpiredCargosOnMap: expiredCargosOnMap,
        updateMyCargoOnMap: updateMyCargoOnMapAction
    } = useMyCargosOnMap();

    const navigate = useNavigate();

    //TODO add check for verified company
    const actions = useMemo(() => {
        if (companiesInfo.loadCompanies.length === 0) {
            return [];
        }
        return [
            {
                name: "Add Cargo",
                iconComponent: PlusSvg,
                onClick: () => {
                    navigate({
                        pathname: "/add-cargo"
                    });
                }
            }
        ];
    }, [companiesInfo.loadCompanies, navigate]);

    useEffect(() => {
        Promise.all([getVehiclesOnMap(), getMyCargosOnMap()]).catch((error) => {
            console.log("error: ", error);
            showErrorNotification("Something went wrong");
        });
        return () => {
            mapRef.current = null;
        };
    }, [getVehiclesOnMap, getMyCargosOnMap]);

    useEffect(() => {
        if (expiredCargosOnMap.length === 0) {
            setIsUpdateExpiredCargosModalOpen(false);
            return;
        }

        if (isUpdateModalStateDefinedRef.current) {
            return;
        }
        if (expiredCargosOnMap.length > 0) {
            isUpdateModalStateDefinedRef.current = true;
            setIsUpdateExpiredCargosModalOpen(true);
        }
    }, [expiredCargosOnMap]);

    function handleCloseWarningMessage() {
        setIsWarningVisible(false);
    }

    const {
        vehicleCompanies,
        expediterCompanies,
        hasVerifiedVehicleCompany,
        hasVerifiedExpediterCompany
    } = companiesInfo;

    const hasCompanies =
        vehicleCompanies.length > 0 || expediterCompanies.length > 0;

    const hasVerifiedCompany =
        hasVerifiedVehicleCompany || hasVerifiedExpediterCompany;

    let warningText = "";
    if (hasCompanies) {
        warningText =
            "Some services are unavailable to you yet. Our managers have to check new registrations. If everything is OK, you will soon be able to use our services";
    } else if (!hasVerifiedCompany) {
        warningText =
            "Some services are unavailable to you yet. Please Add Company in order to use all services";
    }

    const handleClickOnVehicle = useCallback(
        (vehicle) => {
            setSelectedVehicle(vehicle.id);
        },
        [setSelectedVehicle]
    );

    const handleCloseSideBar = useCallback(() => {
        setSelectedVehicle(null);
    }, [setSelectedVehicle]);

    function handleClickOnCard(e, vehicle) {
        if (!hasCompanies) {
            e.stopPropagation();
            onAddCompany();
        } else {
            handleClickOnVehicle(vehicle);
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

    const removeMyCargoFromMap = useCallback(
        async (id) => {
            try {
                await removeMyCargoFromMapAction(id);
                showSuccessNotification(
                    "Cargo successfully removed from the map."
                );
            } catch (e) {
                console.error(e);
                showErrorNotification("Something went wrong.");
            }
        },
        [removeMyCargoFromMapAction]
    );

    const updateMyCargoOnMap = useCallback(
        async (id) => {
            try {
                await updateMyCargoOnMapAction(id);
                showSuccessNotification("Cargo successfully updated.");
            } catch (e) {
                console.error(e);
                showErrorNotification("Something went wrong.");
            }
        },
        [updateMyCargoOnMapAction]
    );

    return {
        vehicles,
        isWarningVisible,
        expiredCargosOnMap,
        myCargosOnMap,
        warningText,
        selectedVehicle,
        actions,
        mapRef,
        isUpdateExpiredCargosModalOpen,
        handleUpdateExpiredCargosModalClose,
        handleCloseWarningMessage,
        handleClickOnCard,
        handleClickOnLocationItem,
        handleCloseSideBar,
        removeMyCargoFromMap,
        updateMyCargoOnMap
    };
};

export default useFindVehiclePageData;
