import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import styles from "./index.module.scss";
import useAnchorElState from "../../../hooks/useAnchorElState";

function DropdownMenu({ selectedItems, items, onChange, placeHolder, name }) {
    const {
        anchorEl,
        onClick: handleClick,
        onClose: handleClose,
        isOpen
    } = useAnchorElState();

    const countOfSelectedItems = selectedItems.length;
    let inputText = placeHolder;
    if (countOfSelectedItems > 0) {
        inputText = `${selectedItems["0"]} +${countOfSelectedItems}`;
    }

    return (
        <div className={styles.DropdownMenu}>
            <Button
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {inputText}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                disablePortal
            >
                {items.map((item, index) => {
                    const selected = selectedItems.includes(item);
                    return (
                        <label className={styles.Container} key={index}>
                            <MenuItem key={index}>{item}</MenuItem>
                            <div className={styles.CheckedArea}>
                                <input
                                    name={name}
                                    value={item}
                                    type="checkbox"
                                    checked={selected}
                                    onChange={onChange}
                                />
                                <div className={styles.Checkmark} />
                            </div>
                        </label>
                    );
                })}
            </Menu>
        </div>
    );
}

export default DropdownMenu;
