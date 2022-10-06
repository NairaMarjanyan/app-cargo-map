import React from "react";

function ExpediterSvg({ color = "currentColor" }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5 20C24.6421 20 28 16.6421 28 12.5C28 8.35786 24.6421 5 20.5 5C16.3579 5 13 8.35786 13 12.5C13 16.6421 16.3579 20 20.5 20ZM20.5 22C23.3938 22 25.9854 20.7062 27.7278 18.6654C30.8681 20.3117 33 23.6895 33 27.5556V33.6C33 34.8873 31.9882 36 30.6562 36H10.3438C9.0118 36 8 34.8873 8 33.6V27.5556C8 23.6895 10.1319 20.3117 13.2722 18.6654C15.0146 20.7062 17.6062 22 20.5 22Z"
                fill={color}
            />
        </svg>
    );
}

export default ExpediterSvg;
