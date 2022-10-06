import React from "react";
import MapSvg from "../../icons/24/MapSvg";
import ListSvg from "../../icons/24/ListSvg";

import styles from "./index.module.scss";

function MobileViewSwitcher({ activePage, onClick }) {
    return (
        <div className={styles.MobileViewSwitcher}>
            <div className={styles.IconsWrapper}>
                <div
                    className={`${styles.IconContainer} ${
                        activePage === "map-view" ? styles.Active : ""
                    }`}
                    onClick={() => onClick("map-view")}
                >
                    <MapSvg />
                </div>
                <div
                    className={`${styles.IconContainer} ${
                        activePage === "list-view" ? styles.Active : ""
                    }`}
                    onClick={() => onClick("list-view")}
                >
                    <ListSvg />
                </div>
            </div>
        </div>
    );
}

export default MobileViewSwitcher;
