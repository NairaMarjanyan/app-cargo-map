import {
    addUserVehicleToMap,
    deleteUserVehicleFromMap,
    fetchUserVehiclesOnMap,
    updateUserVehicleOnMap
} from "../../../api/myVehiclesOnMap";

export const ADD_MY_VEHICLE_TO_CARGO_MAP = "ADD_MY_VEHICLE_TO_CARGO_MAP";
export const SET_MY_VEHICLES_TO_CARGOS_MAP = "SET_MY_VEHICLES_TO_CARGOS_MAP";
export const REMOVE_MY_VEHICLE_FROM_MAP = "REMOVE_MY_VEHICLE_FROM_MAP";
export const UPDATE_MY_VEHICLE_ON_MAP = "UPDATE_MY_VEHICLE_ON_MAP";

export function addMyVehicleToCargoMap({ id, data }) {
    return async (dispatch) => {
        const { data: vehicle } = await addUserVehicleToMap({ id, data });
        dispatch({ type: ADD_MY_VEHICLE_TO_CARGO_MAP, payload: vehicle });
    };
}

export function getMyVehiclesOnMap() {
    return async (dispatch, getState) => {
        const state = getState();
        const myVehiclesOnMap = state.myVehiclesOnMapReducer.myVehiclesOnMap;
        // if we already have myVehiclesOnMap then don't fetch it
        if (myVehiclesOnMap?.length > 0) {
            return;
        }

        const { data: vehicles } = await fetchUserVehiclesOnMap();
        dispatch({ type: SET_MY_VEHICLES_TO_CARGOS_MAP, payload: vehicles });
    };
}

export function removeMyVehicleFromMap(id) {
    return async (dispatch) => {
        await deleteUserVehicleFromMap(id);
        dispatch({ type: REMOVE_MY_VEHICLE_FROM_MAP, payload: id });
    };
}

export function updateMyVehicleOnMap(id) {
    return async (dispatch) => {
        await updateUserVehicleOnMap(id);
        dispatch({ type: UPDATE_MY_VEHICLE_ON_MAP, payload: id });
    };
}
