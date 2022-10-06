import React, { memo } from "react";

const PaperSvg = ({ color = "currentColor" }) => {
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
                d="M6.50003 4H13V7.5C13 8.32843 13.6716 9 14.5 9H18V8.61499C18 8.6171 18 8.61921 18 8.62132V19.5C18 19.7761 17.7762 20 17.5 20H6.5C6.22386 20 6 19.7761 6 19.5L6.00003 4.5C6.00003 4.22386 6.22388 4 6.50003 4ZM17.5858 8L14 4.41417V7.5C14 7.77614 14.2239 8 14.5 8H17.5858ZM5.00003 4.5C5.00003 3.67157 5.6716 3 6.50003 3H13.3787C13.7765 3 14.1581 3.15803 14.4394 3.43934L18.5607 7.56066C18.842 7.84197 19 8.2235 19 8.62132V19.5C19 20.3284 18.3285 21 17.5 21H6.5C5.67157 21 5 20.3284 5 19.5L5.00003 4.5Z"
                fill={color}
            />
        </svg>
    );
};

export default memo(PaperSvg);
