import axios from "../axios";

const LOCATION_ENDPOINT = "/location/api/v1";

export function getLocationByCoordinates({ longitude, latitude }) {
    return axios.get(
        `${LOCATION_ENDPOINT}/geocoders/address/?longitude=${longitude}&latitude=${latitude}`
    );
}
