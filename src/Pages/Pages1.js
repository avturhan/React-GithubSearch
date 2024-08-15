// components/Table/Table.js
import React, { useState, useEffect } from "react";
import "./PagesModules.scss";

function Table({ data, onRepoSelect, currentPage, rowsPerPage }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [filteredData, setFilteredData] = useState(data);
  const [isReversed, setIsReversed] = useState(false);

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
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig !== null) {
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

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = () => {
    // Поиск сработает автоматически благодаря useEffect, ничего делать не нужно
  };

  // Вычисляем индекс начала и конца текущей страницы
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Срез данных для текущей страницы
  const pageData = sortedData.slice(startIndex, endIndex);

  // Инвертируем порядок строк, если включен режим реверса
  const displayedData = isReversed ? pageData.reverse() : pageData;

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="table-container">
      <div className="table-search">
        <input
          type="text"
          placeholder="Поиск в таблице..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Искать</button>
      </div>
      {filteredData.length > 0 && (
        <h2 className="results-header">Результаты поиска</h2>
      )}
      <table className="repository-table">
        <thead>
          <tr>
            <th onClick={handleReverse}>№</th>
            <th onClick={() => handleSort("name")}>Название</th>
            <th onClick={() => handleSort("language")}>Язык</th>
            <th onClick={() => handleSort("forks")}>Число форков</th>
            <th onClick={() => handleSort("stars")}>Число звезд</th>
            <th onClick={() => handleSort("updated")}>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((repo, index) => (
            <tr key={index} onClick={() => onRepoSelect(repo)}>
              <td>{isReversed ? endIndex - index : startIndex + index + 1}</td>
              <td>{repo.name}</td>
              <td>{repo.language}</td>
              <td>{repo.forks}</td>
              <td>{repo.stars}</td>
              <td>{repo.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
