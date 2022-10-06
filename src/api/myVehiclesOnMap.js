import axios from "../axios";

const VEHICLE_ENDPOINT = "/transport/api/v1";

export function addUserVehicleToMap({ id, data }) {
    return axios.post(`${VEHICLE_ENDPOINT}/transports/${id}/add`, data);
}

export function fetchUserVehiclesOnMap() {
    return axios.get(`${VEHICLE_ENDPOINT}/transports/my`);
}

export function deleteUserVehicleFromMap(id) {
    return axios.delete(`${VEHICLE_ENDPOINT}/transports/${id}/location`);
}

export function updateUserVehicleOnMap(id) {
    return axios.put(`${VEHICLE_ENDPOINT}/transports/${id}/location`);
}
