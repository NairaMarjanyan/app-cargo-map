import axios from "../axios";

const CARGO_ENDPOINT = "/load/api/v1";

export function fetchCargoTypes() {
    return axios.get(`${CARGO_ENDPOINT}/cargotypes`);
}

export function fetchCargos() {
    return axios.get(`${CARGO_ENDPOINT}/cargos`);
}

export function fetchCargoById(id) {
    return axios.get(`${CARGO_ENDPOINT}/cargos/${id}`);
}
