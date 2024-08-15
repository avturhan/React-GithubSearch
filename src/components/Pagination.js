import React from "react";
import "./Pagination.scss";

const Pagination = ({
  rowsPerPage,
  totalRows,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(totalRows / rowsPerPage); // Adjust total pages for 'all'

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination-container">
      <div className="rows-per-page">
        <label>Rows per page: </label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="page-info">
        {rowsPerPage === "all"
          ? `1-${totalRows} of ${totalRows}`
          : `${rowsPerPage * (currentPage - 1) + 1}-${Math.min(
              rowsPerPage * currentPage,
              totalRows
            )} of ${totalRows}`}
      </div>

    </div>
  );
};

export default Pagination;
