import React, { memo } from "react";

function MessageSvg({ color = "currentColor" }) {
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
                d="M4 6H20C20.5523 6 21 6.44772 21 7V7.69829L12.6987 12.0674C12.2614 12.2975 11.7388 12.2975 11.3015 12.0674L3 7.69818V7C3 6.44772 3.44772 6 4 6ZM2 7.99972C2 7.99969 2 7.99966 2 7.99963V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V7.98549C22.0003 7.99496 22.0003 8.00443 22 8.01387V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7.99972ZM21 8.82834V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V8.82823L10.8357 12.9523C11.5646 13.3359 12.4356 13.3359 13.1645 12.9523L21 8.82834Z"
                fill={color}
            />
        </svg>
    );
}

export default memo(MessageSvg);
