import React, { memo } from "react";

function DateSvg({ color = "currentColor" }) {
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
                d="M8 3.5C8 3.22386 7.77614 3 7.5 3C7.22386 3 7 3.22386 7 3.5L7 5H4C2.89543 5 2 5.89543 2 7V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V7C22 5.89543 21.1046 5 20 5H17V3.5C17 3.22386 16.7761 3 16.5 3C16.2239 3 16 3.22386 16 3.5L16 5H8L8 3.5ZM16 6.5V6H8V6.5C8 6.77614 7.77614 7 7.5 7C7.22386 7 7 6.77614 7 6.5V6H4C3.44772 6 3 6.44772 3 7V9H21V7C21 6.44772 20.5523 6 20 6H17V6.5C17 6.77614 16.7761 7 16.5 7C16.2239 7 16 6.77614 16 6.5ZM3 18V10H21V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18ZM6 15V13H8V15H6ZM5 13C5 12.4477 5.44772 12 6 12H8C8.55228 12 9 12.4477 9 13V15C9 15.5523 8.55228 16 8 16H6C5.44772 16 5 15.5523 5 15V13Z"
                fill={color}
            />
        </svg>
    );
}

export default memo(DateSvg);
