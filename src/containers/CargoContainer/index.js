import React, { useEffect } from "react";
import Cargos from "../../pages/Cargos";
import useCargoStore from "../../store/hooks/useCargoStore";

function CargoContainer() {
    const { getCargos, cargos, isLoading } = useCargoStore();

    useEffect(() => {
        getCargos().catch((err) => {
            // TODO handle error
            console.log(err);
        });
    }, [getCargos]);

    return <Cargos cargos={cargos} isLoading={isLoading} />;
}

export default CargoContainer;
