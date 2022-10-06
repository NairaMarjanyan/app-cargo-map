import React from "react";
import Characteristic from "../Characteristic";

function CharacteristicWithProgress({ children, capacity, loaded }) {
    const intCapacity = Number.parseInt(capacity);
    const intLoaded = Number.parseInt(loaded);
    const text = `${intLoaded}/${intCapacity}`;
    let loadedPercentage = Math.trunc((100 * intLoaded) / intCapacity);
    return (
        <Characteristic text={text} progressWidth={loadedPercentage}>
            {children}
        </Characteristic>
    );
}

export default CharacteristicWithProgress;
