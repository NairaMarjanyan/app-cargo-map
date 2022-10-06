import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LinkButton from "../../LinkButton";
import PlusSvg from "../../icons/24/PlusSvg";

import styles from "./index.module.scss";
import useAnchorElState from "../../../hooks/useAnchorElState";

function PopoverMenu({ menuItems }) {
    const {
        anchorEl,
        onClick: handleClick,
        onClose: handleClose,
        isOpen
    } = useAnchorElState();

    return (
        <div className={styles.PopoverMenu}>
            <div className={styles.PopoverMenuNavLink} onClick={handleClick}>
                <LinkButton text="Добавить новое">
                    <PlusSvg />
                </LinkButton>
            </div>
            <Menu
                anchorEl={anchorEl}
                disablePortal
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                {menuItems.map((menuItem) => {
                    return (
                        <MenuItem
                            key={menuItem.id}
                            onClick={() => {
                                menuItem.cb(menuItem.id);
                                handleClose();
                            }}
                        >
                            {menuItem.value}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
}

export default PopoverMenu;
