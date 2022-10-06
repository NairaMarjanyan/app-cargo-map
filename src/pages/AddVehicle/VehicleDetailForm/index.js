import React, { memo } from "react";
import Select from "../../../components/UI/Select";
import Input from "../../../components/UI/Input";
import VehicleInfo from "../VehicleInfo";
import RadioButton from "../../../components/UI/RadioButton";

import styles from "./index.module.scss";

const TYPE_OF_LOADING = {
    full: "Full",
    partial: "Less Truck Load"
};

function getVehicleListDisplayValue(vehicle) {
    return `${vehicle.make?.name}, ${vehicle.model?.name} (${vehicle.carNumber})`;
}

const VehicleDetailForm = ({ vehicles, data, onChange, vehicleToDisplay }) => {
    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "fullTransport" || name === "partialTransport") {
            const hasPartialTransport = name === "partialTransport";
            onChange("hasPartialTransport", hasPartialTransport);
        } else {
            onChange(name, value);
        }
    }

    const totalCapacity =
        (vehicleToDisplay?.bodyDimensions?.loadCapacity || 0) +
        (vehicleToDisplay?.trailerDimensions?.loadCapacity || 0);

    const loadedCapacity =
        data.loaded && data.loaded < totalCapacity
            ? totalCapacity - data.loaded
            : totalCapacity;

    const totalVolume =
        (vehicleToDisplay?.bodyDimensions?.volume || 0) +
        (vehicleToDisplay?.trailerDimensions?.volume || 0);

    const loadedVolume =
        data.loadedVolume && data.loadedVolume < totalVolume
            ? totalVolume - data.loadedVolume
            : totalVolume;

    return (
        <div className={styles.VehicleDetailForm}>
            <Select
                value={data.vehicleId || ""}
                label="Выбрать транспорт"
                name="vehicleId"
                onChange={handleInputChange}
                options={vehicles}
                required
                keyPropertyName="id"
                valuePropertyName="id"
                getDisplayPropertyName={getVehicleListDisplayValue}
            />
            {vehicleToDisplay && (
                <div className={styles.InfoContainer}>
                    <VehicleInfo vehicleToDisplay={vehicleToDisplay} />
                </div>
            )}

            <h2 className={styles.Title}>Тип загрузки</h2>
            <div className={styles.RadioButtons}>
                <RadioButton
                    value={TYPE_OF_LOADING.full}
                    label="Полная загрузка"
                    name="fullTransport"
                    checked={data.hasPartialTransport === false}
                    onChange={handleInputChange}
                />
                <RadioButton
                    value={TYPE_OF_LOADING.partial}
                    label="Частичная загрузка"
                    name="partialTransport"
                    checked={data.hasPartialTransport === true}
                    onChange={handleInputChange}
                />
            </div>

            {data.hasPartialTransport && (
                <>
                    <h2 className={styles.Title}>Доступные размеры</h2>
                    <h2 className={styles.Title}>Грузоподъемность</h2>
                    <div className={styles.InputsContainer}>
                        <div className={styles.Row}>
                            <Input
                                type="number"
                                label="Текущая грузоподъемность (т)"
                                name="loaded"
                                value={data.loaded || ""}
                                inputProps={{
                                    "aria-label": "load capacity in t",
                                    "step": 1,
                                    "min": 0,
                                    "max": totalCapacity || Infinity
                                }}
                                disabled={!vehicleToDisplay}
                                onChange={handleInputChange}
                                error={Boolean(data.errors?.loaded)}
                                helperText={data.errors?.loaded}
                                required
                            />
                        </div>
                        <div className={styles.Row}>
                            <Input
                                type="text"
                                name="loaded"
                                label="Грузоподъемность (т)"
                                value={loadedCapacity}
                                inputProps={{
                                    "aria-label": "Capacity (t)"
                                }}
                                disabled={!vehicleToDisplay}
                                readOnly
                            />
                        </div>
                    </div>

                    <h2 className={styles.Title}>Объем</h2>
                    <div className={styles.InputsContainer}>
                        <div className={styles.Row}>
                            <Input
                                type="number"
                                label="Текущий загруженный объем (м3)"
                                name="loadedVolume"
                                value={data.loadedVolume || ""}
                                inputProps={{
                                    "aria-label": "volume in m3",
                                    "step": 1,
                                    "min": 0,
                                    "max": totalVolume || Infinity
                                }}
                                disabled={!vehicleToDisplay}
                                onChange={handleInputChange}
                                error={Boolean(data.errors?.volume)}
                                helperText={data.errors?.volume}
                                required
                            />
                        </div>
                        <div className={styles.Row}>
                            <Input
                                type="text"
                                label="Объем (м3)"
                                value={loadedVolume}
                                name="loadedVolume"
                                inputProps={{
                                    "aria-label": "Volume (m3)"
                                }}
                                disabled={!vehicleToDisplay}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(VehicleDetailForm);
