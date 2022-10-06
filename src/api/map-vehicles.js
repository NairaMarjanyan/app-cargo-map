import axios from "../axios";
// import getData from "./fake-data";

const VEHICLE_ENDPOINT = "/transport/api/v1";

export function getAllVehiclesOnMap() {
    return axios.get(`${VEHICLE_ENDPOINT}/transports/map`);
    // return getData();
}
export function getUserVehicleByIdWithLocationData(id) {
    return axios.get(`${VEHICLE_ENDPOINT}/transports/${id}`);
}
