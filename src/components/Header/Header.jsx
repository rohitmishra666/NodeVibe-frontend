import React from 'react'
import Logo from './Logo'
import AvatarDropdown from './AvatarDropdown'
import Search from './Search'
import Autocomplete from './Autocomplete'

function Header() {
    return (
        <header className="w-full bg-gray-700">
            <div className='flex flex-row  w-full justify-between'>
                <div className=' sm:px-4 w-auto my-2'>
                    <Logo />
                </div>
                <div className='sm:basis-2/4 sm:px-2 p-2 h-16 my-2 flex flex-col'>
                    <div className='flex flex-row'>
                        <Search />
                    </div>
                    <div className='z-50 '>
                        <Autocomplete />
                    </div>
                </div>
                <div className='hidden sm:block sm:basis-1/12 py-1.5'>
                    <AvatarDropdown />
                </div>
            </div>
        </header>
    )
}

export default Header