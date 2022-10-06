import faker from "faker";
import { v4 as uuid } from "uuid";
import { VEHICLE_CATEGORY_TYPE } from "../utils/constants";
const DATA_LENGTH = 100;

const VEHICLE_TYPES = {
    1: VEHICLE_CATEGORY_TYPE.minibus,
    2: VEHICLE_CATEGORY_TYPE.semitrailer,
    3: VEHICLE_CATEGORY_TYPE.trailer,
    4: VEHICLE_CATEGORY_TYPE.truck
};

function spawnData(n = DATA_LENGTH) {
    let data = [];
    for (let i = 0; i < n; i++) {
        const id = uuid();
        const vehicle = {
            id,
            category: VEHICLE_TYPES[getRandomIntNumber(1, 4)],
            fromAddress: faker.fake(`{{address.country}}, {{address.city}}`),
            toAddress:
                getRandomIntNumber(0, 10) > 5
                    ? faker.fake(`{{address.country}}, {{address.city}}`)
                    : null,
            fromLocation: {
                latitude: getRandomNumber(40.0001, 42.1872),
                longitude: getRandomNumber(43.5152, 45.5152)
            },
            toLocation: {
                latitude: getRandomNumber(40.0001, 42.1872),
                longitude: getRandomNumber(43.5152, 45.5152)
            },
            capacity: 1000,
            loaded: getRandomNumber(0, 1000),
            adr: `adr${getRandomIntNumber(1, 9)}`
        };
        data.push(vehicle);
    }
    return data;
}

function getRandomNumber(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(4));
}

function getRandomIntNumber(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(0));
}

function getData(n) {
    return new Promise((res) => {
        setTimeout(() => {
            res({ data: spawnData(n) });
        }, 200);
    });
}

export default getData;
