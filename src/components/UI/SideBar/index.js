import React from "react";
import WindowHeader from "../WindowHeader";

import styles from "./index.module.scss";

const POSITIONS = {
    right: "right",
    left: "left"
};
function SideBar({
    children,
    isOpen,
    onClose,
    title,
    iconComponent,
    position
}) {
    const IconComponent = iconComponent;

    let pos = POSITIONS[position] || POSITIONS.right;
    let sign = pos === POSITIONS.right ? 1 : -1;
    return (
        <div
            className={styles.SideBar}
            style={{
                [pos]: 0,
                transform: `translateX(${isOpen ? 0 : sign * 100}%)`
            }}
        >
            <WindowHeader title={title} onClose={onClose}>
                {IconComponent ? <IconComponent /> : null}
            </WindowHeader>
            <div className={styles.SideBarContent}>{children}</div>
        </div>
    );
}

export default SideBar;
