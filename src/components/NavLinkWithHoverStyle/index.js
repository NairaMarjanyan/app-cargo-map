import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./index.module.scss";

function NavLinkWithHoverStyle({ to, children }) {
    return (
        <div className={styles.NavLinkWithHoverStyle}>
            <NavLink
                to={to}
                className={({ isActive }) => (isActive ? styles.Active : null)}
            >
                {children}
            </NavLink>
            <div className={styles.BottomOutline} />
        </div>
    );
}

export default NavLinkWithHoverStyle;
