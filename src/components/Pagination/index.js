import React from "react";
import TablePagination from "@mui/material/TablePagination";

function Pagination({
    onPageChange,
    onRowsPerPageChange,
    total,
    rowsPerPage,
    currentPage,
    rowsPerPageOptions
}) {
    return (
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
}

export default Pagination;
