import {
    SET_VEHICLES_ON_MAP,
    SET_SELECTED_VEHICLE
} from "../actions/mapVehicles";

const DEFAULT_STATE = {
    vehiclesOnMap: [],
    selectedVehicle: null
};

const vehiclesOnMapReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_VEHICLES_ON_MAP: {
            const vehicles = action.payload;
            return {
                ...state,
                vehiclesOnMap: vehicles
            };
        }

        case SET_SELECTED_VEHICLE: {
            const selectedVehicle = action.payload;

            return {
                ...state,
                selectedVehicle
            };
        }

        default:
            return state;
    }
};

export default vehiclesOnMapReducer;
