import React from "react";
import Input from "../../UI/Input";

import styles from "./index.module.scss";

function BagForm({ data, onChange }) {
    const { id } = data;

    function handleChange(e) {
        const type = e.target.type;
        const value =
            type === "number" ? Number(e.target.value) : e.target.value;
        const name = e.target.name;
        onChange({ id, name, value });
    }

    return (
        <div className={styles.BagForm}>
            <div className={styles.BagFormRow}>
                <div className={styles.FormInput}>
                    <Input
                        type="number"
                        label="Quantity"
                        name="quantity"
                        value={data.quantity || ""}
                        inputProps={{
                            "aria-label": "quantity of the bags",
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
                <div className={styles.FormInput}>
                    <Input
                        type="number"
                        label="Volume (m3)"
                        name="volume"
                        value={data.volume || ""}
                        inputProps={{
                            "aria-label": "volume in m3",
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
                        label="Height"
                        name="height"
                        value={data.height || ""}
                        inputProps={{
                            "aria-label": "height of the bag",
                            "step": 1,
                            "min": 0
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className={styles.BagFormRow}>
                <div className={styles.FormInput}>
                    <Input
                        type="number"
                        label="Width (m)"
                        name="width"
                        value={data.width || ""}
                        inputProps={{
                            "aria-label": "width in meters",
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
                        label="Length (m)"
                        name="length"
                        value={data.length || ""}
                        inputProps={{
                            "aria-label": "length in meters",
                            "step": 1,
                            "min": 0
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default BagForm;
