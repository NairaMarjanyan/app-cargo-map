import React, { useEffect } from "react";
import AddCargo from "../../pages/AddCargo";
import useCargoStore from "../../store/hooks/useCargoStore";
import useVehicleTypesStore from "../../store/hooks/useVehicleTypesStore";
import useMyCargosOnMap from "../../store/hooks/useMyCargosOnMap";

function AddCargoContainer({ companies }) {
    const { getCargoTypes, cargoTypes } = useCargoStore();
    const { getBodyTypes, bodyTypes, getSubTypes, bodySubTypesObj } =
        useVehicleTypesStore();
    const { addMyCargoToVehicleMap } = useMyCargosOnMap();

    useEffect(() => {
        Promise.all([getCargoTypes(), getBodyTypes()]).catch((error) => {
            console.log(error);
            // TODO handle error
        });
    }, [getCargoTypes, getBodyTypes]);

    return (
        <AddCargo
            companies={companies}
            cargoTypes={cargoTypes}
            bodyTypes={bodyTypes}
            getSubTypes={getSubTypes}
            onAddCargoToMap={addMyCargoToVehicleMap}
            bodySubTypesObj={bodySubTypesObj}
        />
    );
}

export default AddCargoContainer;
