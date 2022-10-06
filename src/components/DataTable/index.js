import React from "react";
import DataTables from "react-data-table-component";
import styles from "./index.module.scss";

function DataTable({ data, columns }) {
    return (
        <div className={styles.DataTableContainer}>
            <DataTables
                columns={columns}
                data={data}
                pagination
                noDataComponent={null}
            />
        </div>
    );
}

export default DataTable;
