import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-4">
      {/* Search Input with Icon */}
      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search dishes"
          className="w-full pl-10 p-2 border rounded-[50px] border-gray-300 bg-[#dddedf]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
