import React from "react";
import InputDatePicker from "../../../components/UI/InputDatePicker";
import InputTextarea from "../../../components/UI/InputTextArea";

import styles from "./index.module.scss";
import LocationInput from "../../../components/LocationInput";

const CargoRouteForm = ({ data, onChange }) => {
    return (
        <div className={styles.CargoRouteForm}>
            <div className={styles.InputWrapper}>
                <LocationInput
                    name="fromAddressCoordinates"
                    label="Адрес загрузки"
                    coordinates={data.fromAddressCoordinates}
                    onChange={onChange}
                    required
                />
            </div>

            <div className={styles.InputWrapper}>
                <LocationInput
                    name="toAddressCoordinates"
                    label="Адрес разгрузки"
                    coordinates={data.toAddressCoordinates}
                    onChange={onChange}
                    required
                />
            </div>
            <div className={styles.InputWrapper}>
                <InputDatePicker
                    label="Дата"
                    value={data.date}
                    onChange={(date) => {
                        onChange("date", date);
                    }}
                />
            </div>
            <InputTextarea
                value={data.notes}
                onChange={(e) => onChange("notes", e.target.value)}
                label="Примечание"
                className={styles.InputWrapper}
            />
        </div>
    );
};

export default CargoRouteForm;
