import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    addMyCargoToVehicleMap,
    getMyCargosOnMap,
    removeMyCargoFromMap,
    updateMyCargoOnMap
} from "../../actions/myCargosOnMap";
import useActions from "../../useActions";
import store from "../../index";
import myCargosOnMapReducer from "../../reducers/myCargosOnMap.reducer";
import { showErrorNotification } from "../../../utils/notifications";

const CARGOS_TO_MAP_ACTIONS = {
    addMyCargoToVehicleMap,
    getMyCargosOnMap,
    removeMyCargoFromMap,
    updateMyCargoOnMap
};

store.injectReducer("myCargosOnMapReducer", myCargosOnMapReducer);

const useMyCargosOnMap = () => {
    const { myCargosOnMap } = useSelector((state) => {
        const { myCargosOnMapReducer } = state;
        return {
            myCargosOnMap: myCargosOnMapReducer.myCargosOnMap
        };
    });
    const {
        addMyCargoToVehicleMap,
        getMyCargosOnMap,
        removeMyCargoFromMap,
        updateMyCargoOnMap
    } = useActions(CARGOS_TO_MAP_ACTIONS);

    const myExpiredCargosOnMap = useMemo(() => {
        return myCargosOnMap.filter((myCargo) => myCargo.isExpired);
    }, [myCargosOnMap]);

    useEffect(() => {
        getMyCargosOnMap().catch((error) => {
            console.log("error", error);
            showErrorNotification("Something went wrong");
        });
    }, [getMyCargosOnMap]);

    return {
        myCargosOnMap,
        myExpiredCargosOnMap,
        addMyCargoToVehicleMap,
        getMyCargosOnMap,
        removeMyCargoFromMap,
        updateMyCargoOnMap
    };
};

export default useMyCargosOnMap;
