import { useMemo } from "react";
import { VEHICLE_CATEGORY_TYPE } from "../../utils/constants";
import VehicleSvg from "../../components/icons/48/VehicleSvg";
import LorrySvg from "../../components/icons/48/LorrySvg";
import CouplingSvg from "../../components/icons/48/CouplingSvg";
import BusSvg from "../../components/icons/48/BusSvg";

const useVehicleIcon = ({ category }) => {
    const vehicleIcon = useMemo(() => {
        if (VEHICLE_CATEGORY_TYPE.trailer === category) {
            return VehicleSvg;
        }
        if (VEHICLE_CATEGORY_TYPE.truck === category) {
            return LorrySvg;
        }
        if (VEHICLE_CATEGORY_TYPE.semitrailer === category) {
            return CouplingSvg;
        }
        if (VEHICLE_CATEGORY_TYPE.minibus === category) {
            return BusSvg;
        }
        return VehicleSvg;
    }, [category]);

    return vehicleIcon;
};

export default useVehicleIcon;
