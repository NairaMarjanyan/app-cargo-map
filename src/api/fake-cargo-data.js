import faker from "faker";
import { v4 as uuid } from "uuid";
const DATA_LENGTH = 100;

function spawnData(length = DATA_LENGTH) {
    let data = [];
    for (let i = 0; i < length; i++) {
        const id = uuid();
        const cargo = {
            id,
            type: "cargo type",
            fromAddress: faker.fake(`{{address.country}}, {{address.city}}`),
            toAddress: faker.fake(`{{address.country}}, {{address.city}}`),
            fromLocation: {
                latitude: getRandomNumber(40.0001, 42.1872),
                longitude: getRandomNumber(43.5152, 45.5152)
            },
            weight: getRandomIntNumber(1, 30000),
            adr: `adr${getRandomIntNumber(1, 9)}`
        };
        data.push(cargo);
    }
    return data;
}

function getRandomNumber(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(4));
}

function getRandomIntNumber(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(0));
}

function getData(length) {
    return new Promise((res) => {
        setTimeout(() => {
            res({ data: spawnData(length) });
        }, 200);
    });
}

export default getData;
