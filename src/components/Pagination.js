// Импортируем необходимые библиотеки React
import React from "react";
// Импортируем стили
import "./Pagination.scss";

// Компонент пагинации, принимающий пропсы rowsPerPage, totalRows, currentPage, onPageChange, onRowsPerPageChange
const Pagination = ({
  rowsPerPage,
  totalRows,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  // Вычисляем общее количество страниц
  const totalPages =
    rowsPerPage === "all" ? 1 : Math.ceil(totalRows / rowsPerPage); // Регулируем общее количество страниц для 'all'

  // Обработчик изменения страницы
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Рендеринг компонента пагинации
  return (
    <div className="pagination-container">
      {/* Выбор количества строк на странице */}
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
      {/* Информация о текущей странице */}
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

// Экспортируем компонент Pagination по умолчанию
export default Pagination;
