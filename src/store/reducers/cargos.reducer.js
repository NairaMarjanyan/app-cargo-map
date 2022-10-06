import {
    SET_CARGO_TYPES,
    SET_CARGOS,
    START_LOADING_CARGOS
} from "../actions/cargo";

const DEFAULT_STATE = {
    cargoTypes: [],
    loadingCargos: false,
    cargos: []
};

const cargosReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case START_LOADING_CARGOS: {
            return {
                ...state,
                loadingCargos: true
            };
        }
        case SET_CARGO_TYPES: {
            const cargoTypes = action.payload;
            return {
                ...state,
                cargoTypes
            };
        }
        case SET_CARGOS: {
            const cargos = action.payload;
            return {
                ...state,
                cargos,
                loadingCargos: false
            };
        }
        default:
            return state;
    }
};

export default cargosReducer;
