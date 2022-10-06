import {
    ADD_BODY_SUB_TYPES_FOR_SELECTED_TYPE,
    SET_BODY_TYPES
} from "../actions/vehicleTypes";

const DEFAULT_STATE = {
    bodyTypes: [],
    bodySubTypesObj: {}
};

const vehicleTypesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_BODY_TYPES: {
            const bodyTypes = action.payload;
            return {
                ...state,
                bodyTypes
            };
        }
        case ADD_BODY_SUB_TYPES_FOR_SELECTED_TYPE: {
            const { subTypes, typeId } = action.payload;
            const updatedBodySubTypesObj = { ...state.bodySubTypesObj };
            updatedBodySubTypesObj[typeId] = subTypes;
            return {
                ...state,
                bodySubTypesObj: updatedBodySubTypesObj
            };
        }
        default:
            return state;
    }
};

export default vehicleTypesReducer;
