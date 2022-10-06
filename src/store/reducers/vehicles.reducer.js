import {
    ADD_MODELS_FOR_SELECTED_MAKE,
    ADD_VEHICLE,
    REMOVE_VEHICLE,
    SET_MAKES,
    SET_VEHICLES,
    START_LOADING_VEHICLES
} from "../actions/vehicle";

const DEFAULT_STATE = {
    vehicles: [],
    loadingVehicles: false,
    makes: [],
    modelsObj: {}
};

const vehiclesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case START_LOADING_VEHICLES: {
            return {
                ...state,
                loadingVehicles: true
            };
        }
        case SET_VEHICLES: {
            const vehicles = action.payload;
            return {
                ...state,
                vehicles,
                loadingVehicles: false
            };
        }
        case ADD_VEHICLE: {
            const vehicle = action.payload;
            const vehicles = [...state.vehicles, vehicle];
            return {
                ...state,
                vehicles
            };
        }
        case REMOVE_VEHICLE: {
            const id = action.payload;
            const vehicles = state.vehicles.filter(
                (vehicle) => vehicle.id !== id
            );
            return {
                ...state,
                vehicles
            };
        }

        case SET_MAKES: {
            const makes = action.payload;
            return {
                ...state,
                makes
            };
        }
        case ADD_MODELS_FOR_SELECTED_MAKE: {
            const { models, makeId } = action.payload;
            const updatedModelsObj = { ...state.modelsObj };
            updatedModelsObj[makeId] = models;
            return {
                ...state,
                modelsObj: updatedModelsObj
            };
        }
        default:
            return state;
    }
};

export default vehiclesReducer;
