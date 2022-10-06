import L from "leaflet";
import CargoSvg from "../assets/images/cargo.svg";
import PlusSvg from "../assets/images/plus.svg";
import MinusSvg from "../assets/images/minus.svg";
import VehicleSvg from "../assets/images/vehicle.svg";
import InactiveVehicleSvg from "../assets/images/inactive-vehicle.svg";
import InactiveCargoSvg from "../assets/images/inactive-cargo.svg";

export const vehicleIcon = L.icon({
    iconUrl: VehicleSvg,
    iconSize: [30, 30]
});

export const cargoIcon = L.icon({
    iconUrl: CargoSvg,
    iconSize: [30, 30]
});

export const inactiveVehicleIcon = L.icon({
    iconUrl: InactiveVehicleSvg,
    iconSize: [40, 40]
});

export const inactiveVehicleCargoIcon = L.icon({
    iconUrl: InactiveCargoSvg,
    iconSize: [40, 40]
});

export const plusIcon = L.icon({
    iconUrl: PlusSvg,
    iconSize: [45, 45]
});

export const minusIcon = L.icon({
    iconUrl: MinusSvg,
    iconSize: [45, 45]
});
