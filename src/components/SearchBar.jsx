import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../SearchBar.css';

const SearchBar = ({ components }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = components.filter((component) => {
      const { title, description, content } = component;
      const lowerCaseQuery = query.toLowerCase();

      return (
        title.toLowerCase().includes(lowerCaseQuery) ||
        description.toLowerCase().includes(lowerCaseQuery) ||
        content.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="dropdown">
      <div className="input-group">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="form-control search-input"
          placeholder="Search"
          aria-label="Search"
        />
        {searchQuery && (
          <div className="input-group-append">
            <button
              className="btn clear-button"
              type="button"
              onClick={clearSearch}
            >
              <span className="clear-icon">&#x2716;</span>
            </button>
          </div>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="dropdown-menu show">
          {searchResults.map((result) => (
            <Link
              key={result.title}
              to={result.path}
              className="dropdown-item search-result-link"
              onClick={clearSearch}
            >
              <div className="search-result">
                <span className="search-result-title">{result.title}</span>
                <span className="search-result-content">{result.content}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;