import React, { memo } from "react";

function RadioSvg({ fillColor = "currentColor", borderColor = "none" }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill={fillColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                fill={borderColor}
                stroke="white"
                strokeWidth="2"
            />
            <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
    );
}

export default memo(RadioSvg);
