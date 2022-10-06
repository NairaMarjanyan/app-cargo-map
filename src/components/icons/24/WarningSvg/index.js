import React, { memo } from "react";

const WarningSvg = ({ color = "currentColor" }) => {
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
                d="M11.5 20C16.1944 20 20 16.1944 20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20ZM11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21ZM12 6.5C12 6.77614 11.7761 7 11.5 7C11.2239 7 11 6.77614 11 6.5C11 6.22386 11.2239 6 11.5 6C11.7761 6 12 6.22386 12 6.5ZM12 9.5C12 9.22386 11.7761 9 11.5 9C11.2239 9 11 9.22386 11 9.5V16.5C11 16.7761 11.2239 17 11.5 17C11.7761 17 12 16.7761 12 16.5V9.5Z"
                fill={color}
            />
        </svg>
    );
};

export default memo(WarningSvg);
