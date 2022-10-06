import {
    ADD_MY_VEHICLE_TO_CARGO_MAP,
    REMOVE_MY_VEHICLE_FROM_MAP,
    SET_MY_VEHICLES_TO_CARGOS_MAP,
    UPDATE_MY_VEHICLE_ON_MAP
} from "../actions/myVehiclesOnMap";

const DEFAULT_STATE = {
    myVehiclesOnMap: []
};

const myVehiclesOnMapReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_MY_VEHICLES_TO_CARGOS_MAP: {
            const myVehiclesOnMap = action.payload;

            return {
                ...state,
                myVehiclesOnMap
            };
        }
        case ADD_MY_VEHICLE_TO_CARGO_MAP: {
            const newVehicle = action.payload;

            const updatedVehicles = state.myVehiclesOnMap.filter((vehicle) => {
                return vehicle.id !== newVehicle.id;
            });

            updatedVehicles.push(newVehicle);

            return {
                ...state,
                myVehiclesOnMap: updatedVehicles
            };
        }
        case REMOVE_MY_VEHICLE_FROM_MAP: {
            const id = action.payload;

            const updatedVehicles = state.myVehiclesOnMap.filter((vehicle) => {
                return vehicle.id !== id;
            });

            return {
                ...state,
                myVehiclesOnMap: updatedVehicles
            };
        }
        case UPDATE_MY_VEHICLE_ON_MAP: {
            const id = action.payload;

            const updatedVehicles = state.myVehiclesOnMap.map((vehicle) => {
                if (vehicle.id === id) {
                    return { ...vehicle, isExpired: false };
                }
                return vehicle;
            });

            return {
                ...state,
                myVehiclesOnMap: updatedVehicles
            };
        }

        default:
            return state;
    }
};

export default myVehiclesOnMapReducer;
