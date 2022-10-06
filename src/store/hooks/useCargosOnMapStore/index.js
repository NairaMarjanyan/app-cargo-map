import { useSelector } from "react-redux";
import { getCargosOnMap, setSelectedCargo } from "../../actions/mapCargos";
import useActions from "../../useActions";
import store from "../../index";
import cargosOnMapReducer from "../../reducers/cargosOnMap.reducer";

const CARGOS_ON_MAP_ACTIONS = {
    getCargosOnMap,
    setSelectedCargo
};

store.injectReducer("cargosOnMapReducer", cargosOnMapReducer);

const useCargosOnMapStore = () => {
    const { cargosOnMap, selectedCargo } = useSelector((state) => {
        const { cargosOnMapReducer } = state;
        return {
            cargosOnMap: cargosOnMapReducer.cargosOnMap,
            selectedCargo: cargosOnMapReducer.selectedCargo
        };
    });

    const { getCargosOnMap, setSelectedCargo } = useActions(
        CARGOS_ON_MAP_ACTIONS
    );

    return {
        cargosOnMap,
        getCargosOnMap,
        setSelectedCargo,
        selectedCargo
    };
};

export default useCargosOnMapStore;
