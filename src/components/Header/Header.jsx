import React from 'react'
import Logo from '../Logo'

import AvatarDropdown from '../AvatarDropdown'

function Header() {
    return (
        <header className=" w-full">
            <div className='flex flex-row  justify-between'>
                <div className='sm:basis-1/5 sm:px-4 w-auto my-2'>
                    <Logo />
                </div>
                <div className='sm:basis-2/4 sm:px-2 p-2 h-16 my-2 flex'>
                    <input type='text' placeholder='Search' className='sm:w-full p-2 w-4/5 rounded-l-md' />
                    <button className='rounded-r-md px-2 py-1 bg-red-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/fkdzyfle.json"
                            trigger="hover"
                        >
                        </lord-icon>
                    </button>
                </div>
                <div className='hidden sm:block sm:basis-1/12 py-1.5'>
                    <AvatarDropdown />
                </div>
            </div>
        </header>
    )
}

export default Header