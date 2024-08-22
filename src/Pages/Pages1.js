// Импортируем необходимые библиотеки React, useState и useEffect
import React, { useState, useEffect } from "react";
// Импортируем стили
import "./PagesModules.scss";

// Основная функция-компонент, принимающая пропсы data, onRepoSelect, currentPage и rowsPerPage
function Table({ data, onRepoSelect, currentPage, rowsPerPage }) {
  // Строка поиска
  const [searchTerm, setSearchTerm] = useState("");
  // Конфигурация сортировки
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  // Отфильтрованные данные
  const [filteredData, setFilteredData] = useState(data);
  // Флаг реверса порядка строк
  const [isReversed, setIsReversed] = useState(false);

  // Эффект для фильтрации данных при изменении searchTerm или data
  useEffect(() => {
    const filtered = data.filter((repo) => {
      const searchInForks = repo.forks.toString().includes(searchTerm);
      const searchInStars = repo.stars.toString().includes(searchTerm);
      return (
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.language &&
          repo.language.toLowerCase().includes(searchTerm.toLowerCase())) ||
        searchInForks ||
        searchInStars
      );
    });
    // Обновление состояния отфильтрованных данных
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Мемоизация отсортированных данных
  const sortedData = React.useMemo(() => {
    // Создаем копию отфильтрованных данных
    let sortableData = [...filteredData];
    if (sortConfig !== null) {
      // Сортировка данных по ключу и направлению из sortConfig
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Обработчик сортировки
  const handleSort = (key) => {
    // Определяем направление сортировки
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    // Обновляем конфигурацию сортировки
    setSortConfig({ key, direction });
  };

  // Вычисляем индексы начала текущей страницы
  const startIndex = (currentPage - 1) * rowsPerPage;
  // Вычисляем индексы конца текущей страницы
  const endIndex = startIndex + rowsPerPage;

  // Срез данных для текущей страницы
  const pageData = sortedData.slice(startIndex, endIndex);

  // Инвертируем порядок строк, если включен режим реверса
  const displayedData = isReversed ? pageData.reverse() : pageData;

  // Обработчик реверса порядка строк
  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  // Рендеринг компонента
  return (
    <div className="table-container">
      <div className="table-search">
        {/* Поле ввода для поиска */}
        <input
          type="text"
          placeholder="Поиск в таблице..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Заголовок результатов поиска, если filteredData не пуст */}
      {filteredData.length > 0 && (
        <h2 className="results-header">Результаты поиска</h2>
      )}
      {/* Таблица с данными */}
      <table className="repository-table">
        <thead>
          <tr>
            {/* Заголовки таблицы с обработчиками сортировки и реверса */}
            <th onClick={handleReverse}>№</th>
            <th onClick={() => handleSort("name")}>Название</th>
            <th onClick={() => handleSort("language")}>Язык</th>
            <th onClick={() => handleSort("forks")}>Число форков</th>
            <th onClick={() => handleSort("stars")}>Число звезд</th>
            <th onClick={() => handleSort("updated")}>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          {/* Строки таблицы с данными репозиториев */}
          {displayedData.map((repo, index) => (
            <tr key={index} onClick={() => onRepoSelect(repo)}>
              {/* Номер строки */}
              <td>{isReversed ? endIndex - index : startIndex + index + 1}</td>
              {/* Имя репозитория */}
              <td>{repo.name}</td>
              {/* Язык программирования репозитория */}
              <td>{repo.language}</td>
              {/* Число форков */}
              <td>{repo.forks}</td>
              {/* Число звезд */}
              <td>{repo.stars}</td>
              {/* Дата последнего обновления */}
              <td>{repo.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Экспортируем компонент Table по умолчанию
export default Table;
