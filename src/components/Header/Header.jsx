import React from 'react'
import Logo from '../Logo'
import { Avatar } from '@radix-ui/react-avatar'

function Header() {
    return (
        <header className="bg-gray-400 width-screen ">
            <div className='flex flex-row  justify-between'>
                <div className='basis-1/5 px-4'>
                    <Logo />
                </div>
                <div className='basis-2/4 px-2 py-2 flex'>
                    <input type='text' placeholder='Search' className='w-full p-2' />
                    <button className='rounded-r-md px-2 py-1 bg-red-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/fkdzyfle.json"
                            trigger="hover"
                            >
                        </lord-icon>
                    </button>
                </div>
                <div className='basis-1/12 py-2.5'>
                    <Avatar>👨</Avatar>
                </div>
            </div>
        </header>
    )
}

export default Header