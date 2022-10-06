import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import styles from "./index.module.scss";
import useAnchorElState from "../../../hooks/useAnchorElState";

function PopupMenu({ menuItems, children, isFullWidth, notificationCount }) {
    const {
        anchorEl,
        onClick: handleClick,
        onClose: handleClose,
        isOpen
    } = useAnchorElState();

    return (
        <div
            className={`${styles.PopupMenu} ${
                isFullWidth ? styles.FullWidth : ""
            }`}
        >
            <div onClick={handleClick} className={styles.UserIcon}>
                {children}
            </div>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClick={handleClose}
                disablePortal
            >
                {menuItems.map((menuItem) => {
                    const IconComponent = menuItem.iconComponent;
                    const Component = menuItem.component;
                    return (
                        <MenuItem key={menuItem.title} onClick={menuItem.cb}>
                            {IconComponent && (
                                <div className={styles.IconWrapper}>
                                    <IconComponent />
                                </div>
                            )}
                            {Component && (
                                <div className={styles.IconWrapper}>
                                    <Component
                                        notificationCount={notificationCount}
                                    />
                                </div>
                            )}

                            {menuItem.title}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
}

export default PopupMenu;
