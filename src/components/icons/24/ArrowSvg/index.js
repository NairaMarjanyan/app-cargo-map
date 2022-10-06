import React, { memo } from "react";

function ArrowSvg({ color = "currentColor" }) {
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
                d="M9.85355 5.14645C10.0271 5.32001 10.0464 5.58944 9.91141 5.78431L9.85355 5.85355L4.706 11H19.5C19.7761 11 20 11.2239 20 11.5C20 11.7761 19.7761 12 19.5 12H4.706L9.85355 17.1464C10.0271 17.32 10.0464 17.5894 9.91141 17.7843L9.85355 17.8536C9.67999 18.0271 9.41056 18.0464 9.21569 17.9114L9.14645 17.8536L3.14645 11.8536C2.97288 11.68 2.9536 11.4106 3.08859 11.2157L3.14645 11.1464L9.14645 5.14645C9.34171 4.95118 9.65829 4.95118 9.85355 5.14645Z"
                fill={color}
            />
        </svg>
    );
}

export default memo(ArrowSvg);
