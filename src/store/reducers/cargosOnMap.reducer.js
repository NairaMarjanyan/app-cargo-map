import { SET_CARGOS_ON_MAP, SET_SELECTED_CARGO } from "../actions/mapCargos";

const DEFAULT_STATE = {
    cargosOnMap: [],
    selectedCargo: null
};

const cargosOnMapReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CARGOS_ON_MAP: {
            const cargos = action.payload;
            return {
                ...state,
                cargosOnMap: cargos
            };
        }

        case SET_SELECTED_CARGO: {
            const selectedCargo = action.payload;

            return {
                ...state,
                selectedCargo
            };
        }
        default:
            return state;
    }
};

export default cargosOnMapReducer;
