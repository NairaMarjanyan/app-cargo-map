import {
    fetchCargosOnMap,
    getUserCargoByIdWithLocationData
} from "../../../api/map-cargos";

export const SET_CARGOS_ON_MAP = "SET_CARGOS_ON_MAP";
export const SET_SELECTED_CARGO = "SET_SELECTED_CARGO";

export function getCargosOnMap() {
    return async (dispatch) => {
        const { data: cargos } = await fetchCargosOnMap();
        dispatch({ type: SET_CARGOS_ON_MAP, payload: cargos });
    };
}

export function setSelectedCargo(id) {
    return async (dispatch) => {
        let cargo = null;
        if (id) {
            const response = await getUserCargoByIdWithLocationData(id);
            cargo = response.data;
        }
        dispatch({ type: SET_SELECTED_CARGO, payload: cargo });
    };
}
