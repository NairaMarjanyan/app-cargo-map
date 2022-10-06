import React from "react";
import Input from "../../../components/UI/Input";
import InputDatePicker from "../../../components/UI/InputDatePicker";
import InputTextarea from "../../../components/UI/InputTextArea";
import styles from "./index.module.scss";
import LocationInput from "../../../components/LocationInput";

const VehicleRouteForm = ({ data, onChange }) => {
    function handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        onChange(name, value);
    }

    return (
        <div className={styles.VehicleRouteForm}>
            <div className={styles.InputWrapper}>
                <InputDatePicker
                    value={data.date || ""}
                    label="Date"
                    onChange={(date) => onChange("date", date)}
                />
            </div>

            <div className={styles.InputWrapper}>
                <LocationInput
                    name="fromAddressCoordinates"
                    label="From Address"
                    coordinates={data.fromAddressCoordinates}
                    onChange={onChange}
                    required
                />
            </div>

            <div className={styles.InputWrapper}>
                <LocationInput
                    name="toAddressCoordinates"
                    label="To Address"
                    coordinates={data.toAddressCoordinates}
                    onChange={onChange}
                />
            </div>

            <div className={styles.InputWrapper}>
                <Input
                    value={data.contactPersonName || ""}
                    inputProps={{
                        "aria-label": "from Contact Name"
                    }}
                    label="Contact Person Name"
                    onChange={handleInputChange}
                    type="text"
                    name="contactPersonName"
                />
            </div>
            <div className={styles.InputWrapper}>
                <Input
                    value={data.phoneNumber || ""}
                    inputProps={{
                        "aria-label": "from Number"
                    }}
                    label="Phone Number"
                    onChange={handleInputChange}
                    type="text"
                    name="phoneNumber"
                />
            </div>
            <div className={styles.InputWrapper}>
                <InputTextarea
                    label="Notes"
                    value={data.notes || ""}
                    name="notes"
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default VehicleRouteForm;
