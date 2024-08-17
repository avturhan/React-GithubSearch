// Импортируем необходимые библиотеки React, useState и useEffect
import React, { useState, useEffect } from "react";
// Импортируем стили
import "./App.scss";
// Импортируем компонент таблицы
import Table from "./Pages/Pages1";
// Импортируем компонент заголовка
import Header from "./components/Header/Header";
// Импортируем компонент пагинации
import Pagination from "./components/Pagination";
// Импортируем компонент деталей репозитория
import RepoDetails from "./components/RepoDeTails/RepoDeTails";
// Импортируем функцию для получения данных репозиториев из API
import { fetchRepositories } from "./components/api";

// Основная функция-компонент
function App() {
  // Определение состояния для списка репозиториев
  const [repositories, setRepositories] = useState([]);
  // Определение состояния для выбранного репозитория
  const [selectedRepo, setSelectedRepo] = useState(null);
  // Определение состояния для строки поиска
  const [searchQuery, setSearchQuery] = useState("");
  // Определение состояния для флага, указывающего, был ли выполнен поиск
  const [hasSearched, setHasSearched] = useState(false);
  // Определение состояния для текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  // Определение состояния для количества строк на странице
  const [rowsPerPage, setRowsPerPage] = useState(30); // По умолчанию 30
  // Определение состояния для ширины панели
  const [panelWidth, setPanelWidth] = useState(700); // Начальная ширина панели

  // Эффект для получения данных репозиториев при изменении searchQuery, rowsPerPage или currentPage
  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          const data = await fetchRepositories(
            searchQuery,
            rowsPerPage === "all" ? 100 : rowsPerPage,
            currentPage
          );
          // console.log("Fetched repositories data:", data);
          setRepositories(data);
        } catch (error) {
          console.error("Error fetching repositories:", error);
          setRepositories([]);
        }
      };
      fetchData();
    }
  }, [searchQuery, rowsPerPage, currentPage]);

  // Обработчик выбора репозитория
  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  // Обработчик изменения строки поиска
  const handleSearchChange = async (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentPage(1); // Сброс на первую страницу при новом поиске
  };

  // Обработчик изменения страницы
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Обработчик изменения количества строк на странице
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Сброс на первую страницу при изменении количества строк на странице
  };

  // Обработчик нажатия мыши для изменения размера панели
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Обработчик перемещения мыши для изменения размера панели
  const handleMouseMove = (e) => {
    const newWidth =
      e.clientX -
      document.querySelector(".content-area").getBoundingClientRect().left;
    // Убедитесь, что новая ширина не меньше 0
    if (newWidth >= 0) {
      setPanelWidth(newWidth);
    }
  };

  // Обработчик отпускания мыши после изменения размера панели
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Вычисляем общее количество строк
  const totalRows = repositories.length; // Общее количество элементов, используйте длину ответа API

  // Рендеринг компонента
  return (
    <div className="App">
      {/* Компонент заголовка */}
      <Header onSearchChange={handleSearchChange} />
      <div className="main-content">
        {/* Проверка, был ли выполнен поиск и есть ли строка поиска */}
        {hasSearched && searchQuery ? (
          <div className="content-area">
            <div className="table-section">
              {/* Компонент таблицы */}
              <Table
                data={repositories}
                onRepoSelect={handleRepoSelect}
                searchQuery={searchQuery}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
              />
              {/* Компонент пагинации */}
              <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
            <div
              className="resizable-panel"
              style={{ width: `${panelWidth}px` }}
            >
              {/* Область для изменения размера */}
              <div className="resizer" onMouseDown={handleMouseDown} />
              {/* Компонент деталей репозитория */}
              <RepoDetails repo={selectedRepo} />
            </div>
          </div>
        ) : (
          <div className="welcome-message">Добро пожаловать</div>
        )}
      </div>
    </div>
  );
}

// Экспортируем компонент App по умолчанию
export default App;
