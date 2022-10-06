import React, { memo } from "react";

function CheckMarkSvg({ color = "currentColor" }) {
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
                d="M20.6464 4.64645C20.8417 4.45118 21.1583 4.45118 21.3536 4.64645C21.5271 4.82001 21.5464 5.08944 21.4114 5.28431L21.3536 5.35355L8.5 18.2071L2.64645 12.3536C2.45118 12.1583 2.45118 11.8417 2.64645 11.6464C2.82001 11.4729 3.08944 11.4536 3.28431 11.5886L3.35355 11.6464L8.5 16.793L20.6464 4.64645Z"
                fill={color}
            />
        </svg>
    );
}

export default memo(CheckMarkSvg);
