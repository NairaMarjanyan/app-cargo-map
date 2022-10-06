import axios from "../axios";

const USER_ENDPOINT = "/api";

export function logout() {
    return axios.get(`${USER_ENDPOINT}/account/logout`);
}
