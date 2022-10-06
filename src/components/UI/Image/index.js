import React from "react";
import { getImageUrlForDataTable } from "../../DataTable/helpers";
import styles from "./index.module.scss";

function Image({ row }) {
    return (
        <div className={styles.Pictures}>
            <img src={getImageUrlForDataTable(row)} />
        </div>
    );
}

export default Image;
