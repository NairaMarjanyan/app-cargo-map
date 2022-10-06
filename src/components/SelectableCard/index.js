import React from "react";
import styles from "./index.module.scss";
import RadioSvg from "../icons/24/RadioSvg";

function SelectableCard({ children, title, text, isSelected, onClick }) {
    const fillColor = isSelected ? "var(--fb-main-color)" : "none";
    const borderColor = isSelected
        ? "var(--fb-main-color)"
        : "var(--fb-color-gray-100)";
    return (
        <div
            className={`${styles.CardContainer} ${
                isSelected ? styles.Active : ""
            }`}
            onClick={onClick}
        >
            <div className={styles.Logo}>{children}</div>
            <div>
                <div className={styles.InfoContainerTitleSVG}>
                    <p className={styles.Title}>{title}</p>
                    <div className={styles.InfoContainerSVG}>
                        <RadioSvg
                            fillColor={fillColor}
                            borderColor={borderColor}
                        />
                    </div>
                </div>
                <p className={styles.Text}>{text}</p>
            </div>
        </div>
    );
}

export default SelectableCard;
