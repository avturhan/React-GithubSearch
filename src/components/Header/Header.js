// Импортируем необходимые библиотеки React
import React, { useState } from "react";
// Импортируем стили
import "./HeaderModules.scss";

// Функция-компонент для заголовка, принимающая пропс onSearchChange
function Header({ onSearchChange }) {
  // Используем хук useState для хранения значения поискового запроса
  const [query, setQuery] = useState("");

  // Обработчик изменения ввода, обновляет состояние query
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Обработчик нажатия кнопки поиска, вызывает функцию поиска
  const handleSearch = () => {
    onSearchChange(query);
  };

  // Обработчик нажатия клавиш, выполняет поиск при нажатии Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращаем возможное действие по умолчанию
      handleSearch(); // Вызов функции поиска при нажатии Enter
    }
  };

  // Рендеринг компонента заголовка с поисковым вводом и кнопкой
  return (
    <div className="HeaderSearch">
      <div className="HeaderSearchContent">
        {/* Поле ввода для поискового запроса */}
        <input
          className="HeaderInput"
          type="text"
          placeholder="Введите поисковый запрос"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
        />
        {/* Кнопка для выполнения поиска */}
        <button className="HeaderButton" onClick={handleSearch}>
          <span className="ButtonSpan">ИСКАТЬ</span>
        </button>
      </div>
      {/* Здесь можно добавить код для отображения результатов поиска */}
    </div>
  );
}

// Экспортируем компонент Header по умолчанию
export default Header;
