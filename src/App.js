import React, { useState, useEffect } from "react";
import "./App.scss";
import Table from "./Pages/Pages1";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination";
import RepoDetails from "./components/RepoDeTails/RepoDeTails";
import { fetchRepositories } from "./components/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30); // Default to 30
  const [panelWidth, setPanelWidth] = useState(700); // Initial panel width

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

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
  };

  const handleSearchChange = async (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page on rows per page change
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth =
      e.clientX -
      document.querySelector(".content-area").getBoundingClientRect().left;
    // Ensure the new width is not less than 0
    if (newWidth >= 0) {
      setPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Calculate the total number of rows
  const totalRows = repositories.length; // Total number of items, use API response length

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <div className="main-content">
        {hasSearched && searchQuery ? (
          <div className="content-area">
            <div className="table-section">
              <Table
                data={repositories}
                onRepoSelect={handleRepoSelect}
                searchQuery={searchQuery}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
              />
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
              <div className="resizer" onMouseDown={handleMouseDown} />
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

export default App;
