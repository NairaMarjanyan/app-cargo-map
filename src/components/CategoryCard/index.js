import React from "react";
import styles from "./index.module.scss";

function CategoryCard({ children, title, isSelected, onClick }) {
    return (
        <div
            className={`${styles.CategoryCard} ${
                isSelected ? styles.Active : ""
            }`}
            onClick={onClick}
        >
            <div className={styles.Logo}>{children}</div>
            <p className={styles.Title}>{title}</p>
        </div>
    );
}

export default CategoryCard;
