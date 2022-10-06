import {
    getUserVehicles,
    createUserVehicle,
    getVehicleMakeTypes,
    getVehicleModels
} from "../../../api/vehicle";

export const SET_VEHICLES = "SET_VEHICLES";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const REMOVE_VEHICLE = "REMOVE_VEHICLE";
export const START_LOADING_VEHICLES = "START_LOADING_VEHICLES";
export const SET_MAKES = "SET_MAKES";
export const ADD_MODELS_FOR_SELECTED_MAKE = "ADD_MODELS_FOR_SELECTED_MAKE";

export function getVehicles() {
    return async (dispatch, getState) => {
        const state = getState();
        const currentVehicles = state.vehiclesReducer.vehicles;
        // if we already have vehicles then don't fetch it
        if (currentVehicles.length > 0) {
            return;
        }
        dispatch({ type: START_LOADING_VEHICLES });
        const { data: vehicles } = await getUserVehicles();
        dispatch({ type: SET_VEHICLES, payload: vehicles });
    };
}

export function createVehicle(vehicleData) {
    return async (dispatch) => {
        const { data: vehicle } = await createUserVehicle(vehicleData);
        dispatch({ type: ADD_VEHICLE, payload: vehicle });
    };
}

export function getMakes() {
    return async (dispatch, getState) => {
        const state = getState();
        // don't fetch if we already have makes
        if (state.vehiclesReducer.makes.length > 0) {
            return;
        }

        const { data: makes } = await getVehicleMakeTypes();
        dispatch({ type: SET_MAKES, payload: makes });
    };
}

export function getModelsByMakeId(makeId) {
    return async (dispatch, getState) => {
        const state = getState();
        const currentModelsObj = state.vehiclesReducer.modelsObj;
        // if we already have sub types for this body type then don't get it
        // or if we don't have body types yet
        if (!makeId || currentModelsObj[makeId]) {
            return;
        }

        const { data: models } = await getVehicleModels(makeId);
        dispatch({
            type: ADD_MODELS_FOR_SELECTED_MAKE,
            payload: {
                models,
                makeId
            }
        });
    };
}
