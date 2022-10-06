import React from "react";
import Input from "../../UI/Input";
import { PALLET_TYPES } from "../../../utils/constants";
import Select from "../../UI/Select";

import styles from "./index.module.scss";

const PALLET_TYPES_FOR_SELECT = [
    {
        name: "euro",
        id: PALLET_TYPES.euro
    },
    {
        name: "other",
        id: PALLET_TYPES.other
    }
];

function PalletForm({ data, onChange }) {
    const { id, palletType } = data;

    function handleChange(e) {
        const type = e.target.type;
        const value =
            type === "number" ? Number(e.target.value) : e.target.value;
        const name = e.target.name;
        onChange({ id, name, value });
    }

    return (
        <div className={styles.PalletForm}>
            <div className={styles.Row}>
                <div className={styles.FormInput}>
                    <Select
                        label="Pallet Type"
                        name="palletType"
                        value={palletType}
                        onChange={handleChange}
                        inputProps={{
                            "aria-label": "Name"
                        }}
                        options={PALLET_TYPES_FOR_SELECT}
                        keyPropertyName="id"
                        valuePropertyName="id"
                        displayPropertyName="name"
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
                            "aria-label": "volume of the pallet in m3",
                            "step": 1,
                            "min": 1
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.FormInput}>
                    <Input
                        type="number"
                        label="Quantity"
                        name="quantity"
                        value={data.quantity || ""}
                        inputProps={{
                            "aria-label": "quantity of the pallet",
                            "step": 1,
                            "min": 1
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
                            "aria-label": "weight of the pallet in kg",
                            "step": 1,
                            "min": 1
                        }}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            {palletType === PALLET_TYPES.other && (
                <div className={styles.Row}>
                    <div className={styles.FormInput}>
                        <Input
                            type="number"
                            label="Height"
                            name="height"
                            value={data.height || ""}
                            inputProps={{
                                "aria-label": "height of the pallet",
                                "step": 1,
                                "min": 1
                            }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <Input
                            type="number"
                            label="Width (m)"
                            name="width"
                            value={data.width || ""}
                            inputProps={{
                                "aria-label": "width in meters",
                                "step": 1,
                                "min": 1
                            }}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PalletForm;
