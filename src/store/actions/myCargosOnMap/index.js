import {
    addUserCargoToMap,
    deleteUserCargoFromMap,
    fetchUserCargosOnMap,
    updateUserCargoOnMap
} from "../../../api/myCargosOnMap";

export const SET_MY_CARGOS_TO_VEHICLE_MAP = "SET_MY_CARGOS_TO_VEHICLE_MAP";
export const ADD_MY_CARGO_TO_VEHICLE_MAP = "ADD_MY_CARGO_TO_VEHICLE_MAP";
export const REMOVE_MY_CARGO_FROM_MAP = "REMOVE_MY_CARGO_FROM_MAP";
export const UPDATE_MY_CARGO_ON_MAP = "UPDATE_MY_CARGO_ON_MAP";

export function getMyCargosOnMap() {
    return async (dispatch, getState) => {
        const state = getState();
        const myCargosOnMap = state.myCargosOnMapReducer.myCargosOnMap;
        // if we already have myCargosOnMap then don't fetch it
        if (myCargosOnMap?.length > 0) {
            return;
        }

        const { data: cargos } = await fetchUserCargosOnMap();
        dispatch({ type: SET_MY_CARGOS_TO_VEHICLE_MAP, payload: cargos });
    };
}

export function addMyCargoToVehicleMap(data) {
    return async (dispatch) => {
        const { data: cargo } = await addUserCargoToMap(data);
        dispatch({ type: ADD_MY_CARGO_TO_VEHICLE_MAP, payload: cargo });
    };
}

export function removeMyCargoFromMap(id) {
    return async (dispatch) => {
        await deleteUserCargoFromMap(id);
        dispatch({ type: REMOVE_MY_CARGO_FROM_MAP, payload: id });
    };
}

export function updateMyCargoOnMap(id) {
    return async (dispatch) => {
        await updateUserCargoOnMap(id);
        dispatch({ type: UPDATE_MY_CARGO_ON_MAP, payload: id });
    };
}
