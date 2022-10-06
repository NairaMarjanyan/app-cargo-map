import React from "react";

import styles from "./index.module.scss";
import Input from "../UI/Input";

function CargoPackageForm({ data, onChange }) {
    const { id } = data;

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        onChange({ id, name, value });
    }
    return (
        <div className={styles.CargoPackageForm}>
            <Input
                type="text"
                label="Pallet Type"
                name="palletType"
                value={data.palletType || ""}
                onChange={handleChange}
                required
            />
            <Input
                type="text"
                label="Volume (m3)"
                name="volume"
                value={data.volume || ""}
                inputProps={{
                    ariaLabel: "Volume (m3)"
                }}
                onChange={handleChange}
                required
            />
            <Input
                type="text"
                label="Quantity"
                name="quantity"
                value={data.quantity || ""}
                inputProps={{
                    ariaLabel: "Quantity"
                }}
                onChange={handleChange}
                required
            />
            <Input
                type="text"
                label="Weight (kg)"
                name="weight"
                value={data.weight || ""}
                inputProps={{
                    ariaLabel: "Weight (kg)"
                }}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default CargoPackageForm;
