// Импортируем необходимые библиотеки React
import React from "react";
// Импортируем стили
import "./RepoDeTails.scss";

// Функция-компонент для отображения деталей репозитория, принимающая пропс repo
function RepoDetails({ repo }) {
  // Если репозиторий не выбран, отображаем сообщение-заполнитель
  if (!repo) {
    return (
      <div className="repo-details-placeholder">
        Выберите репозиторий для просмотра деталей.
      </div>
    );
  }

  // Используем теги из репозитория или пустой массив, если их нет
  const tags = repo.tags || []; 

  // Рендеринг компонента с деталями репозитория
  return (
    <div className="repo-details">
      {/* Название репозитория */}
      <h2 className="repo-name">{repo.name}</h2>
      {/* Информация о языке репозитория */}
      <p className="repo-info">
        <strong>Язык:</strong> {repo.language}
      </p>
      {/* Информация о числе форков */}
      <p className="repo-info">
        <strong>Число форков:</strong> {repo.forks}
      </p>
      {/* Информация о числе звезд */}
      <p className="repo-info">
        <strong>Число звезд:</strong> {repo.stars}
      </p>
      {/* Дата последнего обновления */}
      <p className="repo-info">
        <strong>Дата обновления:</strong> {repo.updated}
      </p>
      {/* Дата создания репозитория */}
      <p className="repo-info">
        <strong>Дата создания:</strong> {repo.created_at || "Не указана"}
      </p>
      {/* Количество коммитов */}
      <p className="repo-info">
        <strong>Количество коммитов:</strong> {repo.commits || "Не указано"}
      </p>
      {/* Владелец репозитория */}
      <p className="repo-info">
        <strong>Владелец:</strong> {repo.owner?.login || "Не указан"}
      </p>
      {/* Статус лицензии */}
      <p className="repo-info">
        <strong>Статус лицензии:</strong> {repo.license?.name || "Не указана"}
      </p>
      {/* Описание репозитория */}
      <p className="repo-info">
        <strong>Описание:</strong> {repo.description || "Нет описания"}
      </p>
      {/* URL репозитория */}
      <p className="repo-info">
        <strong>URL:</strong>{" "}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.html_url}
        </a>
      </p>
      {/* Теги репозитория */}
      <div className="repo-tags">
        <strong>Теги:</strong>
        {tags.length > 0 ? (
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        ) : (
          <p>Нет тегов</p>
        )}
      </div>
    </div>
  );
}

// Экспортируем компонент RepoDetails по умолчанию
export default RepoDetails;
