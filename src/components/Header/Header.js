import React, { useState } from "react";
import "./HeaderModules.scss";

function Header({ onSearchChange }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearchChange(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращаем возможное действие по умолчанию
      handleSearch(); // Вызов функции поиска при нажатии Enter
    }
  };

  return (
    <div className="HeaderSearch">
      <div className="HeaderSearchContent">
        <input
          className="HeaderInput"
          type="text"
          placeholder="Введите поисковый запрос"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
        />
        <button className="HeaderButton" onClick={handleSearch}>
          <span className="ButtonSpan">ИСКАТЬ</span>
        </button>
      </div>
      {/* Здесь можно добавить код для отображения результатов поиска */}
    </div>
  );
}

export default Header;
