import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    addMyVehicleToCargoMap,
    getMyVehiclesOnMap,
    removeMyVehicleFromMap,
    updateMyVehicleOnMap
} from "../../actions/myVehiclesOnMap";
import useActions from "../../useActions";
import store from "../../index";
import myVehiclesOnMapReducer from "../../reducers/myVehiclesOnMap.reducer";
import { showErrorNotification } from "../../../utils/notifications";

const MY_VEHICLES_ON_MAP_ACTIONS = {
    addMyVehicleToCargoMap,
    getMyVehiclesOnMap,
    removeMyVehicleFromMap,
    updateMyVehicleOnMap
};

store.injectReducer("myVehiclesOnMapReducer", myVehiclesOnMapReducer);

const useMyVehiclesOnMap = () => {
    const { myVehiclesOnMap } = useSelector((state) => {
        const { myVehiclesOnMapReducer } = state;
        return {
            myVehiclesOnMap: myVehiclesOnMapReducer.myVehiclesOnMap
        };
    });

    const {
        addMyVehicleToCargoMap,
        getMyVehiclesOnMap,
        removeMyVehicleFromMap,
        updateMyVehicleOnMap
    } = useActions(MY_VEHICLES_ON_MAP_ACTIONS);

    const myExpiredVehiclesOnMap = useMemo(() => {
        return myVehiclesOnMap.filter((myVehicle) => myVehicle.isExpired);
    }, [myVehiclesOnMap]);

    useEffect(() => {
        getMyVehiclesOnMap().catch((error) => {
            console.log("error", error);
            showErrorNotification("Something went wrong");
        });
    }, [getMyVehiclesOnMap]);

    return {
        myVehiclesOnMap,
        myExpiredVehiclesOnMap,
        addMyVehicleToCargoMap,
        getMyVehiclesOnMap,
        removeMyVehicleFromMap,
        updateMyVehicleOnMap
    };
};

export default useMyVehiclesOnMap;
