import { useSelector } from "react-redux";
import {
    createVehicle,
    getVehicles,
    getMakes,
    getModelsByMakeId
} from "../../actions/vehicle";
import useActions from "../../useActions";
import store from "../../index";
import vehiclesReducer from "../../reducers/vehicles.reducer";

const VEHICLE_ACTIONS = {
    getVehicles,
    createVehicle,
    getMakes,
    getModelsByMakeId
};

store.injectReducer("vehiclesReducer", vehiclesReducer);

const useVehicleStore = () => {
    // Actions
    const { getVehicles, createVehicle, getMakes, getModelsByMakeId } =
        useActions(VEHICLE_ACTIONS);

    // State
    const { vehicles, loading, makes, modelsObj } = useSelector((state) => {
        const { vehiclesReducer } = state;
        return {
            vehicles: vehiclesReducer.vehicles,
            loading: vehiclesReducer.loadingVehicles,
            makes: vehiclesReducer.makes,
            modelsObj: vehiclesReducer.modelsObj
        };
    });

    return {
        vehicles,
        getVehicles,
        createVehicle,
        loading,
        getMakes,
        makes,
        getModelsByMakeId,
        modelsObj
    };
};

export default useVehicleStore;
