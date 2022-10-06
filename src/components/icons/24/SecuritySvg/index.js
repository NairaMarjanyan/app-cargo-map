import React, { memo } from "react";

const SecuritySvg = ({ color = "currentColor" }) => {
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
                d="M3.1916 6.06211C6.25418 5.41541 9.10874 4.01977 11.5 2C13.8913 4.01977 16.7458 5.41541 19.8084 6.06211L20 6.10256V13.5C20 18.1944 16.1944 22 11.5 22C6.80558 22 3 18.1944 3 13.5V6.10256L3.1916 6.06211ZM12 3.6618C14.0979 5.18618 16.4754 6.28841 19 6.90369V13.5C19 17.4741 15.909 20.7263 12 20.9836L12 3.6618ZM11 3.6618C8.90215 5.18618 6.52465 6.28841 4 6.90369V13.5C4 17.4741 7.09098 20.7263 11 20.9836L11 3.6618Z"
                fill={color}
            />
        </svg>
    );
};

export default memo(SecuritySvg);
