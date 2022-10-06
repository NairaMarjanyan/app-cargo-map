import React from "react";
import "./index.scss";

function CheckBox({ label, value, onChange, ...inputProps }) {
    return (
        <div className="fb-checkBox">
            <label className="container">
                {label}
                <input
                    type="checkbox"
                    value={value}
                    onChange={onChange}
                    {...inputProps}
                />
                <span className="checkmark" />
            </label>
        </div>
    );
}

export default CheckBox;
