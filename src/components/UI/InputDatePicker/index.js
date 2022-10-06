import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ruLocale from "date-fns/locale/ru";

import DateSvg from "../../icons/24/DateSvg";
import styles from "./index.module.scss";

function InputDatePicker({ value, onChange, label, ...dateProps }) {
    return (
        <div className={styles.InputDatePicker}>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={ruLocale}
            >
                <DatePicker
                    components={{
                        OpenPickerIcon: DateSvg
                    }}
                    mask="__.__.____"
                    disablePortal
                    label={label}
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                    {...dateProps}
                />
            </LocalizationProvider>
        </div>
    );
}

export default InputDatePicker;
