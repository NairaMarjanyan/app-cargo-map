import React from "react";
import Input from "../../../components/UI/Input";

import styles from "./index.module.scss";

function DimensionForm({ property, title, onChange, data, errors }) {
    function handleChange(e) {
        onChange(property, e.target.name, e.target.value);
    }
    return (
        <div className={styles.DimensionForm}>
            <h3 className={styles.Title}>
                <span className={styles.Asterisk}>*</span>
                {title}
            </h3>
            <div className={styles.FormsContainer}>
                <div className={styles.Row}>
                    <div>
                        <Input
                            type="number"
                            label="Ширина (м)"
                            name="width"
                            value={data?.width || ""}
                            inputProps={{
                                "aria-label": "width",
                                "step": 1,
                                "min": 0
                            }}
                            onChange={handleChange}
                            required
                            error={Boolean(errors?.width)}
                            helperText={errors?.width}
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            label="Высота (м)"
                            name="height"
                            value={data?.height || ""}
                            inputProps={{
                                "aria-label": "height",
                                "step": 1,
                                "min": 0
                            }}
                            onChange={handleChange}
                            required
                            error={Boolean(errors?.height)}
                            helperText={errors?.height}
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            label="Длина (м)"
                            name="length"
                            value={data?.length || ""}
                            inputProps={{
                                "aria-label": "length in m",
                                "step": 1,
                                "min": 0
                            }}
                            onChange={handleChange}
                            required
                            error={Boolean(errors?.length)}
                            helperText={errors?.length}
                        />
                    </div>
                </div>
                <div className={styles.RowInput}>
                    <div>
                        <Input
                            type="number"
                            label="Объем (м3)"
                            name="volume"
                            value={data?.volume || ""}
                            inputProps={{
                                "aria-label": "volume in m3",
                                "step": 1,
                                "min": 0
                            }}
                            onChange={handleChange}
                            required
                            error={Boolean(errors?.volume)}
                            helperText={errors?.volume}
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            label="Грузоподъемность (т)"
                            name="loadCapacity"
                            value={data?.loadCapacity || ""}
                            inputProps={{
                                "aria-label": "load Capacity in m3",
                                "step": 1,
                                "min": 0
                            }}
                            onChange={handleChange}
                            required
                            error={Boolean(errors?.loadCapacity)}
                            helperText={errors?.loadCapacity}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DimensionForm;
