import React, { useEffect } from "react";
import AddVehicle from "../../pages/AddVehicle";
import useVehicleStore from "../../store/hooks/useVehicleStore";
import useMyVehiclesOnMap from "../../store/hooks/useMyVehiclesOnMap";

function AddVehicleContainer() {
    const { vehicles, getVehicles } = useVehicleStore();
    const { addMyVehicleToCargoMap } = useMyVehiclesOnMap();

    useEffect(() => {
        getVehicles().catch((err) => {
            // TODO handle error
            console.log(err);
        });
    }, [getVehicles]);

    return (
        <AddVehicle
            vehicles={vehicles}
            onVehiclesAdd={addMyVehicleToCargoMap}
        />
    );
}

export default AddVehicleContainer;
