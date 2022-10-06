import { useSelector } from "react-redux";
import {
    getVehiclesOnMap,
    setSelectedVehicle
} from "../../actions/mapVehicles";
import useActions from "../../useActions";
import store from "../../index";
import vehiclesOnMapReducer from "../../reducers/vehiclesOnMap.reducer";

const VEHICLES_TO_MAP_ACTIONS = {
    getVehiclesOnMap,
    setSelectedVehicle
};

store.injectReducer("vehiclesOnMapReducer", vehiclesOnMapReducer);

const useVehiclesOnMapStore = () => {
    const { vehiclesOnMap, selectedVehicle } = useSelector((state) => {
        const { vehiclesOnMapReducer } = state;
        return {
            vehiclesOnMap: vehiclesOnMapReducer.vehiclesOnMap,
            selectedVehicle: vehiclesOnMapReducer.selectedVehicle
        };
    });
    const { getVehiclesOnMap, setSelectedVehicle } = useActions(
        VEHICLES_TO_MAP_ACTIONS
    );

    return {
        vehiclesOnMap,
        getVehiclesOnMap,
        setSelectedVehicle,
        selectedVehicle
    };
};

export default useVehiclesOnMapStore;
