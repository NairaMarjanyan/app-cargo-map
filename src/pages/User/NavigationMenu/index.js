import { NavLink } from "react-router-dom";
import React from "react";

import styles from "./index.module.scss";

function NavigationMenu({ to, text, title, children }) {
    return (
        <div className={styles.Sidebar}>
            <NavLink to={to}>
                <div style={{ pointerEvents: "none" }}>{children}</div>
                <div className={styles.SidebarMenu}>
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
            </NavLink>
        </div>
    );
}

export default NavigationMenu;
