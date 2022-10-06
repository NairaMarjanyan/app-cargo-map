import React, { memo } from "react";

function AddVehicleSvg() {
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
                d="M2.5 17H5C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17H12.5C13.3284 17 14 16.3284 14 15.5V6.5C14 5.67157 13.3284 5 12.5 5H2.5C1.67157 5 1 5.67157 1 6.5V15.5C1 16.3284 1.67157 17 2.5 17ZM12.5 6H2.5C2.22386 6 2 6.22386 2 6.5V15.5C2 15.7761 2.22386 16 2.5 16H5.26756C5.61337 15.4022 6.25972 15 7 15C7.74028 15 8.38663 15.4022 8.73244 16H12.5C12.7761 16 13 15.7761 13 15.5V6.5C13 6.22386 12.7761 6 12.5 6ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
                fill="#101828"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 17H16.5C15.6716 17 15 16.3284 15 15.5V9.5C15 8.67157 15.6716 8 16.5 8H17.8787C18.2765 8 18.658 8.15804 18.9393 8.43934L22.5607 12.0607C22.842 12.342 23 12.7235 23 13.1213V15.5C23 16.3284 22.3284 17 21.5 17H21C21 18.1046 20.1046 19 19 19C17.8954 19 17 18.1046 17 17ZM19 18C19.5523 18 20 17.5523 20 17C20 16.4477 19.5523 16 19 16C18.4477 16 18 16.4477 18 17C18 17.5523 18.4477 18 19 18ZM17.2676 16H16.5C16.2239 16 16 15.7761 16 15.5V9.5C16 9.22386 16.2239 9 16.5 9H17.8787C18.0113 9 18.1385 9.05268 18.2322 9.14645L21.8536 12.7678C21.9473 12.8615 22 12.9887 22 13.1213V15.5C22 15.7761 21.7761 16 21.5 16H20.7324C20.3866 15.4022 19.7403 15 19 15C18.2597 15 17.6134 15.4022 17.2676 16Z"
                fill="#101828"
            />
        </svg>
    );
}

export default memo(AddVehicleSvg);
