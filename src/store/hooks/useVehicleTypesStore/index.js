import { useSelector } from "react-redux";
import { getBodyTypes, getSubTypes } from "../../actions/vehicleTypes";
import useActions from "../../useActions";
import store from "../../index";
import vehicleTypesReducer from "../../reducers/vehicleTypes.reducer";

const VEHICLE_TYPE_ACTIONS = {
    getBodyTypes,
    getSubTypes
};

store.injectReducer("vehicleTypesReducer", vehicleTypesReducer);

const useVehicleTypesStore = () => {
    // Actions
    const { getBodyTypes, getSubTypes } = useActions(VEHICLE_TYPE_ACTIONS);

    // State
    const { bodyTypes, bodySubTypesObj } = useSelector((state) => {
        const { vehicleTypesReducer } = state;
        return {
            bodyTypes: vehicleTypesReducer.bodyTypes,
            bodySubTypesObj: vehicleTypesReducer.bodySubTypesObj
        };
    });

    return {
        getBodyTypes,
        bodyTypes,
        getSubTypes,
        bodySubTypesObj
    };
};

export default useVehicleTypesStore;
