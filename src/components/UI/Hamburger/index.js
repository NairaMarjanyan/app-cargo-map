import React, { useState, memo } from "react";

import styles from "./index.module.scss";

function Hamburger({ onClick }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen((prevState) => !prevState);
        onClick?.();
    }

    return (
        <div
            className={`${styles.Hamburger} ${isOpen ? styles.Open : ""}`}
            onClick={handleClick}
        >
            <span />
            <span />
            <span />
        </div>
    );
}

export default memo(Hamburger);
