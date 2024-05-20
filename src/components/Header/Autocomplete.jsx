import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'
import useDebounce from '@/custom-hooks/useDebounce'
import { useNavigate } from 'react-router-dom'

let debouncedAutocomplete = null

function Autocomplete() {

  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate()

  const autocomplete = (query) => {

    if (query.length < 3) {
      setSearchResult([])
      return
    }
    axios.post(import.meta.env.VITE_SEARCH_URL, { query: query }).then((response) => {
      console.log(response.data.data.searchResult)
      setSearchResult(response.data.data.searchResult)
    })

  }

  debouncedAutocomplete = useDebounce(autocomplete, 1000)

  return (
    <>
      {searchResult.length > 0 &&
        <div className='bg-gray-600 rounded-md border p-4'>
          <ScrollArea>
            {searchResult.map((result) => (
              <div
                key={Date.now()}
                className='flex flex-row items-center'
                onClick={() => {
                  setSearchResult([])
                  navigate(`/watch/${result._id}`)
                }}
              >
                <img src={result.thumbnail} alt='thumbnail' className='w-16 h-16' />
                <div className='flex flex-col'>
                  <h1>{result.title}</h1>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      }
    </>
  )
}

export default Autocomplete
export { debouncedAutocomplete }