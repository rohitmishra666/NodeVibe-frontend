import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { debouncedAutocomplete } from '@/components/Header/Autocomplete'

function Search() {

    const searchRef = useRef()
    const navigate = useNavigate()

    // const consoleDebounce = useDebounce(() => {
    //     console.log(searchRef.current?.value || 'empty')
    // }, 1000)

    return (
        <>
            <input
                type='text'
                placeholder='Search'
                ref={searchRef}
                onChange={() => {
                    // consoleDebounce()
                    debouncedAutocomplete(searchRef.current?.value || 'a')
                }}
                className='sm:w-full p-2 w-4/5 rounded-l-md'
            />
            <button
                onClick={(e) => {
                    e.preventDefault()
                    navigate(`/search/${searchRef.current.value}`)
                }}
                className='rounded-r-md px-2 py-1 bg-red-500'>
                <lord-icon
                    src="https://cdn.lordicon.com/fkdzyfle.json"
                    trigger="hover"
                >
                </lord-icon>
            </button>
        </>
    )
}

export default Search