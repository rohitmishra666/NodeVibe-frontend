import React, { useState } from 'react';
import Logo from './Logo';
import AvatarDropdown from './AvatarDropdown';
import Search from './Search';
import Autocomplete from './Autocomplete';

function Header() {
    const [isSearchActive, setIsSearchActive] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-10">
            <div className="flex items-center justify-between w-full gap-6 p-4">
                <div className="flex items-center">
                    <Logo />
                </div>
                <div className="flex-1 mx-4">
                    <div className="relative w-auto">
                        <Search setIsSearchActive={setIsSearchActive} />
                        {isSearchActive && (
                            <div className="absolute top-full w-full z-50">
                                <Autocomplete />
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden sm:block mr-10">
                    <AvatarDropdown />
                </div>
            </div>
        </header>
    );
}

export default Header;
