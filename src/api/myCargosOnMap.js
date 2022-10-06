import axios from "../axios";
const CARGO_ENDPOINT = "/load/api/v1";

export function addUserCargoToMap(data) {
    return axios.post(`${CARGO_ENDPOINT}/cargos`, data);
}
export function fetchUserCargosOnMap() {
    return axios.get(`${CARGO_ENDPOINT}/cargos/my`);
}

export function deleteUserCargoFromMap(id) {
    return axios.delete(`${CARGO_ENDPOINT}/cargos/${id}/location`);
}

export function updateUserCargoOnMap(id) {
    return axios.put(`${CARGO_ENDPOINT}/cargos/${id}/location`);
}
