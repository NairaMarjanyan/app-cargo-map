import React, { memo } from "react";

const PlusSvg = ({ color = "currentColor" }) => {
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
                d="M12 4C12.2761 4 12.5 4.22386 12.5 4.5V11.5H19.5C19.7761 11.5 20 11.7239 20 12C20 12.2761 19.7761 12.5 19.5 12.5H12.5V19.5C12.5 19.7761 12.2761 20 12 20C11.7239 20 11.5 19.7761 11.5 19.5V12.5H4.5C4.22386 12.5 4 12.2761 4 12C4 11.7239 4.22386 11.5 4.5 11.5H11.5V4.5C11.5 4.22386 11.7239 4 12 4Z"
                fill={color}
            />
        </svg>
    );
};

export default memo(PlusSvg);
