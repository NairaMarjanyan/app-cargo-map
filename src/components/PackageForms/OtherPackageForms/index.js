import React from "react";
import Input from "../../UI/Input";
import InputTextarea from "../../UI/InputTextArea";

import styles from "./index.module.scss";

function OtherPackageForms({ data, onChange }) {
    const { id } = data;

    function handleChange(e) {
        const type = e.target.type;
        const value =
            type === "number" ? Number(e.target.value) : e.target.value;
        const name = e.target.name;
        onChange({ id, name, value });
    }
    return (
        <div className={styles.OtherPackageForms}>
            <div className={styles.OtherPackageFormsRow}>
                <div className={styles.FormInput}>
                    <Input
                        type="number"
                        label="Quantity"
                        name="quantity"
                        value={data.quantity || ""}
                        inputProps={{
                            "aria-label": "input for quantity",
                            "step": 1,
                            "min": 0
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.FormInput}>
                    <Input
                        type="number"
                        label="Weight (kg)"
                        name="weight"
                        value={data.weight || ""}
                        inputProps={{
                            "aria-label": "weight in kg",
                            "step": 1,
                            "min": 0
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className={styles.OtherPackageFormsRow}>
                <div className={styles.FormText}>
                    <InputTextarea
                        value={data.notes || ""}
                        onChange={handleChange}
                        name="notes"
                        aria-label="textarea"
                        placeholder="Notes"
                        inputProps={{ "aria-label": "notes for the pallet" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default OtherPackageForms;
