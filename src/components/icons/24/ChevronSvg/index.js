import React, { memo } from "react";

function ChevronSvg({ color = "currentColor" }) {
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
                d="M15.1464 3.14645C15.3417 2.95118 15.6583 2.95118 15.8536 3.14645C16.0271 3.32001 16.0464 3.58944 15.9114 3.78431L15.8536 3.85355L7.707 12L15.8536 20.1464C16.0271 20.32 16.0464 20.5894 15.9114 20.7843L15.8536 20.8536C15.68 21.0271 15.4106 21.0464 15.2157 20.9114L15.1464 20.8536L6.64645 12.3536C6.47288 12.18 6.4536 11.9106 6.58859 11.7157L6.64645 11.6464L15.1464 3.14645Z"
                fill={color}
            />
        </svg>
    );
}

export default memo(ChevronSvg);
