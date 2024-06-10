import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { debouncedAutocomplete } from '@/components/Header/Autocomplete';

function Search({ setIsSearchActive }) {
  const searchRef = useRef();
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsSearchActive(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsSearchActive(false), 100); // Delay to allow click on autocomplete
  };

  return (
    <div className="flex items-center w-full max-w-2xl">
      <input
        type="text"
        placeholder="Search"
        ref={searchRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={() => debouncedAutocomplete(searchRef.current?.value || 'a')}
        onChange={() => debouncedAutocomplete(searchRef.current?.value || 'a')}
        className="w-full p-2 rounded-l-md border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate(`/search/${searchRef.current.value}`);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 py-2 transition-colors duration-300 flex items-center"
      >
        <lord-icon
          src="https://cdn.lordicon.com/fkdzyfle.json"
          trigger="hover"
          style={{ width: '24px', height: '24px' }}
        />
      </button>
    </div>
  );
}

export default Search;
