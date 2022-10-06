import React, { useEffect } from "react";
import BackDrop from "../../BackDrop";
import WindowHeader from "../WindowHeader";

import styles from "./index.module.scss";
// todo fix header
function Modal({
    children,
    isOpen,
    onBackDropClick,
    onClose,
    title,
    iconComponent,
    hideHeader = false
}) {
    useEffect(() => {
        // We need to disable scroll on the page if modal is opened
        const appEl = document.getElementById("app");
        if (appEl) {
            appEl.style.overflowY = "hidden";
        }
        return () => {
            appEl.style.overflowY = "auto";
        };
    }, []);

    const IconComponent = iconComponent;
    return (
        isOpen && (
            <>
                <div className={styles.Modal}>
                    {!hideHeader && (
                        <WindowHeader title={title} onClose={onClose}>
                            {IconComponent ? <IconComponent /> : null}
                        </WindowHeader>
                    )}
                    <div className={styles.ModalContent}>{children}</div>
                </div>
                <BackDrop onClick={onBackDropClick} />
            </>
        )
    );
}

export default Modal;
