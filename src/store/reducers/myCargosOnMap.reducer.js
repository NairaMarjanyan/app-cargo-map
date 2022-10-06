import {
    ADD_MY_CARGO_TO_VEHICLE_MAP,
    REMOVE_MY_CARGO_FROM_MAP,
    SET_MY_CARGOS_TO_VEHICLE_MAP,
    UPDATE_MY_CARGO_ON_MAP
} from "../actions/myCargosOnMap";

const DEFAULT_STATE = {
    myCargosOnMap: []
};

const myCargosOnMapReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_MY_CARGO_TO_VEHICLE_MAP: {
            const cargo = action.payload;
            const myCargosOnMap = [...state.myCargosOnMap, cargo];
            return {
                ...state,
                myCargosOnMap
            };
        }

        case SET_MY_CARGOS_TO_VEHICLE_MAP: {
            const myCargosOnMap = action.payload;
            return {
                ...state,
                myCargosOnMap
            };
        }
        case REMOVE_MY_CARGO_FROM_MAP: {
            const id = action.payload;

            const myCargosOnMap = state.myCargosOnMap.filter((cargo) => {
                return cargo.id !== id;
            });

            return {
                ...state,
                myCargosOnMap
            };
        }
        case UPDATE_MY_CARGO_ON_MAP: {
            const id = action.payload;

            const myCargosOnMap = state.myCargosOnMap.map((cargo) => {
                if (cargo.id === id) {
                    return { ...cargo, isExpired: false };
                }
                return cargo;
            });

            return {
                ...state,
                myCargosOnMap
            };
        }

        default:
            return state;
    }
};

export default myCargosOnMapReducer;
