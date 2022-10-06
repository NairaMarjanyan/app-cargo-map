import axios from "../axios";

const VEHICLE_ENDPOINT = "/transport/api/v1";

export function getUserVehicles() {
    return axios.get(`${VEHICLE_ENDPOINT}/transports`);
}

export function getUserVehicleById(id) {
    return axios.get(`${VEHICLE_ENDPOINT}/transports/${id}`);
}

export function createUserVehicle(vehicleData) {
    return axios.post(`${VEHICLE_ENDPOINT}/transports`, vehicleData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function getVehicleBodySubTypes(bodyTypeId) {
    return axios.get(`${VEHICLE_ENDPOINT}/bodytypes/${bodyTypeId}/types`);
}

export function getVehicleMakeTypes() {
    return axios.get(`${VEHICLE_ENDPOINT}/makes`);
}

export function getVehicleModels(makeId) {
    return axios.get(`${VEHICLE_ENDPOINT}/makes/${makeId}/models`);
}

export function getVehicleBodyTypes() {
    return axios.get(`${VEHICLE_ENDPOINT}/bodytypes`);
}
