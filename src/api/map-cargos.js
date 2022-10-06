import axios from "../axios";

const CARGO_ENDPOINT = "/load/api/v1";

export function fetchCargosOnMap() {
    return axios.get(`${CARGO_ENDPOINT}/cargos/map`);
}
export function getUserCargoByIdWithLocationData(id) {
    return axios.get(`${CARGO_ENDPOINT}/cargos/${id}`);
}
