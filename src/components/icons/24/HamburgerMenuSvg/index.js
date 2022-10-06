import React, { memo } from "react";

function HamburgerMenuSvg({ color = "currentColor" }) {
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
                d="M20.5 5H3.5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H20.5C20.7761 6 21 5.77614 21 5.5C21 5.22386 20.7761 5 20.5 5ZM20.5 11H3.5C3.22386 11 3 11.2239 3 11.5C3 11.7761 3.22386 12 3.5 12H20.5C20.7761 12 21 11.7761 21 11.5C21 11.2239 20.7761 11 20.5 11ZM3.5 17H20.5C20.7761 17 21 17.2239 21 17.5C21 17.7761 20.7761 18 20.5 18H3.5C3.22386 18 3 17.7761 3 17.5C3 17.2239 3.22386 17 3.5 17Z"
                fill={color}
            />
        </svg>
    );
}

export default memo(HamburgerMenuSvg);
