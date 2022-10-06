import {
    getAllVehiclesOnMap,
    getUserVehicleByIdWithLocationData
} from "../../../api/map-vehicles";

export const SET_VEHICLES_ON_MAP = "SET_VEHICLES_ON_MAP";
export const SET_SELECTED_VEHICLE = "SET_SELECTED_VEHICLE";

export function getVehiclesOnMap() {
    return async (dispatch) => {
        const { data: vehicles } = await getAllVehiclesOnMap();
        dispatch({ type: SET_VEHICLES_ON_MAP, payload: vehicles });
    };
}

export function setSelectedVehicle(id) {
    return async (dispatch) => {
        let vehicle = null;
        if (id) {
            const response = await getUserVehicleByIdWithLocationData(id);
            vehicle = response.data;
        }
        dispatch({ type: SET_SELECTED_VEHICLE, payload: vehicle });
    };
}
