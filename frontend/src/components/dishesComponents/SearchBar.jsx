import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search dish"
        className="w-full p-2 border rounded-md mb-4"
      />
    </div>
  );
};

export default SearchBar;
