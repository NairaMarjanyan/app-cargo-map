import { fetchCargoTypes, fetchCargos } from "../../../api/cargo";

export const SET_CARGO_TYPES = "SET_CARGO_TYPES";
export const SET_CARGOS = "SET_CARGOS";
export const START_LOADING_CARGOS = "START_LOADING_CARGOS";

export function getCargoTypes() {
    return async (dispatch, getState) => {
        const state = getState();
        const currentCargoTypes = state.cargoReducer.cargoTypes;
        // if we already have cargoTypes then don't fetch it
        if (currentCargoTypes?.length > 0) {
            return;
        }
        const { data: cargoTypes } = await fetchCargoTypes();
        dispatch({ type: SET_CARGO_TYPES, payload: cargoTypes });
    };
}
export function getCargos() {
    return async (dispatch, getState) => {
        const state = getState();
        const currentCargoLoads = state.cargoReducer.cargoTypes;
        // if we already have cargoTypes then don't fetch it
        if (currentCargoLoads?.length > 0) {
            return;
        }
        dispatch({ type: START_LOADING_CARGOS });
        const { data: cargoLoads } = await fetchCargos();
        dispatch({ type: SET_CARGOS, payload: cargoLoads });
    };
}
