import React, { memo } from "react";

const TimeSvg = ({ color = "currentColor" }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5ZM21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5ZM12 6.5C12 6.22386 11.7761 6 11.5 6C11.2239 6 11 6.22386 11 6.5V11.25C11 11.6642 11.3358 12 11.75 12H14C14.2761 12 14.5 11.7761 14.5 11.5C14.5 11.2239 14.2761 11 14 11H12V6.5Z"
                fill={color}
            />
        </svg>
    );
};

export default memo(TimeSvg);
