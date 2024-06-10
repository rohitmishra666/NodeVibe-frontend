import React, { useState } from 'react';
import Logo from './Logo';
import AvatarDropdown from './AvatarDropdown';
import Search from './Search';
import Autocomplete from './Autocomplete';

function Header({ setIsNavbarOpen, isNavbarOpen }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-10">
      <div className="flex items-center justify-between w-full p-4">
        <div className="flex items-center mr-1">
          <Logo />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl">
            <Search setIsSearchActive={setIsSearchActive} />
            {isSearchActive && (
              <Autocomplete />
            )}
          </div>
        </div>
        <div className="hidden sm:block">
          <AvatarDropdown />
        </div>
        <div className="block sm:hidden ml-1 mt-2">
          <button 
          onClick={toggleNavbar}
          onBlur={()=>{setIsNavbarOpen(false)}} 
          className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
