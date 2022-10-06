import { useSelector } from "react-redux";
import { getCargoTypes, getCargos } from "../../actions/cargo";
import useActions from "../../useActions";
import store from "../../index";
import cargoReducer from "../../reducers/cargos.reducer";

const CARGO_ACTIONS = {
    getCargoTypes,
    getCargos
};

store.injectReducer("cargoReducer", cargoReducer);

const useCargoStore = () => {
    // Actions
    const { getCargoTypes, getCargos } = useActions(CARGO_ACTIONS);

    // State
    const { cargoTypes, isLoading, cargos } = useSelector((state) => {
        const { cargoReducer } = state;
        return {
            cargoTypes: cargoReducer.cargoTypes,
            isLoading: cargoReducer.loadingCargos,
            cargos: cargoReducer.cargos
        };
    });

    return {
        cargoTypes,
        cargos,
        isLoading,
        getCargoTypes,
        getCargos
    };
};

export default useCargoStore;
