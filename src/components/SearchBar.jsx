"use client";
import React, { useState } from "react";

const SearchBar = ({ onSearch , placeholder = "Search for anything" }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  const handleSearch = () => {
    onSearch(searchInput); 
  };

  return (
    <div className="py-2 dark:bg-black bg-white rounded-full flex items-center px-4 mb-5 shadow-md w-full">
      <span className="text-gray-600 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
      <input
        className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-sm capitalize"
        placeholder={placeholder}
        value={searchInput}
        onChange={handleInputChange}
      />
      {searchInput && (
        <button
          className="text-gray-600 ml-2 "
          onClick={handleClearInput}
          title="Clear Search"
        >
          ✖️
        </button>
      )}
      <button
        className=" ml-2 bg-[#033E8A] text-white px-4 py-1 rounded text-sm"
        onClick={handleSearch}
        title="Search"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;