import {
    getVehicleBodyTypes,
    getVehicleBodySubTypes
} from "../../../api/vehicle";

export const SET_BODY_TYPES = "SET_BODY_TYPES";
export const ADD_BODY_SUB_TYPES_FOR_SELECTED_TYPE =
    "ADD_BODY_SUB_TYPES_FOR_SELECTED_TYPE";

export function getBodyTypes() {
    return async (dispatch, getState) => {
        const state = getState();
        // don't fetch if we already have bodyTypes
        if (state.vehicleTypesReducer.bodyTypes.length > 0) {
            return;
        }

        const { data: bodyTypes } = await getVehicleBodyTypes();
        dispatch({ type: SET_BODY_TYPES, payload: bodyTypes });
    };
}

export function getSubTypes(typeId) {
    return async (dispatch, getState) => {
        const state = getState();
        const currentSubTypesObj = state.vehicleTypesReducer.bodySubTypesObj;
        // if we already have sub types for this body type then don't get it
        // or if we don't have body types yet
        if (!typeId || currentSubTypesObj[typeId]) {
            return;
        }

        const { data: subTypes } = await getVehicleBodySubTypes(typeId);
        dispatch({
            type: ADD_BODY_SUB_TYPES_FOR_SELECTED_TYPE,
            payload: {
                subTypes,
                typeId
            }
        });
    };
}
