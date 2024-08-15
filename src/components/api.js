// Получение количества коммитов для репозитория
const getCommitsCount = async (repoFullName) => {
  const response = await fetch(
    `https://api.github.com/repos/${repoFullName}/commits?per_page=1`
  );
  if (response.ok) {
    const commits = await response.json();
    return commits.length; // Возвращаем количество коммитов
  }
  return 0;
};

// Получение данных о репозиториях
export const fetchRepositories = async (query, perPage = 30, page = 1) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&per_page=${perPage}&page=${page}`
  );
  const data = await response.json();

  const reposWithCommitsCount = await Promise.all(
    data.items.map(async (repo) => {
      const commitsCount = await getCommitsCount(repo.full_name);

      return {
        name: repo.name,
        language: repo.language,
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

  return reposWithCommitsCount;
};
