// Асинхронная функция для получения количества коммитов для репозитория
const getCommitsCount = async (repoFullName) => {
  // Выполняем запрос к API GitHub для получения коммитов репозитория
  const response = await fetch(
    `https://api.github.com/repos/${repoFullName}/commits?per_page=1`
  );
  
  // Проверяем, успешен ли запрос
  if (response.ok) {
    // Парсим ответ как JSON
    const commits = await response.json();
    // Возвращаем количество коммитов
    return commits.length; 
  }
  
  // Если запрос не успешен, возвращаем 0
  return 0;
};

// Асинхронная функция для получения данных о репозиториях
export const fetchRepositories = async (query, perPage = 30, page = 1) => {
  // Выполняем запрос к API GitHub для поиска репозиториев по запросу
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`
  );
  
  // Парсим ответ как JSON
  const data = await response.json();
  // Логируем данные для отладки
  console.log(data);

  // Используем Promise.all для ожидания выполнения всех асинхронных операций по получению количества коммитов
  const reposWithCommitsCount = await Promise.all(
    // Преобразуем каждый репозиторий, добавляя количество коммитов
    data.items.map(async (repo) => {
      const commitsCount = await getCommitsCount(repo.full_name);

      // Возвращаем объект репозитория с дополнительной информацией
      return {
        name: repo.name,
        language: repo.language || "Не указан",
        forks: repo.forks_count,
        stars: repo.stargazers_count,
        updated: new Date(repo.updated_at).toLocaleDateString(),
        created_at: new Date(repo.created_at).toLocaleDateString(),
        commits: commitsCount,
        owner: {
          login: repo.owner.login,
          avatar_url: repo.owner.avatar_url,
        },
        license: repo.license
          ? { name: repo.license.name }
          : { name: "Не указана" },
        description: repo.description || "Нет описания",
        html_url: repo.html_url,
        tags: repo.topics || [],
      };
    })
  );

  // Возвращаем массив репозиториев с дополнительной информацией
  return reposWithCommitsCount;
};
