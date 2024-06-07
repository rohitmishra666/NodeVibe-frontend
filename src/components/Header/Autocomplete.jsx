import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';
import useDebounce from '@/custom-hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

let debouncedAutocomplete = null;

function Autocomplete() {
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const autocomplete = (query) => {
    if (query.length < 3) {
      setSearchResult([]);
      return;
    }
    axios.post(import.meta.env.VITE_SEARCH_URL, { query: query })
      .then((response) => {
        setSearchResult(response.data.data.searchResult);
      });
  };

  debouncedAutocomplete = useDebounce(autocomplete, 800);

  return (
    <>
      {searchResult.length > 0 &&
        <div
          className="bg-gray-800 rounded-lg border border-gray-600 p-4 absolute ml-24 w-[66%] z-10">
          <ScrollArea>
            {searchResult.map((result) => (
              <div
                key={uuid()}
                className="flex items-center cursor-pointer mb-3 hover:bg-gray-700 p-2 rounded-md transition-colors duration-300"
                onClick={() => {
                  setSearchResult([]);
                  navigate(`/watch/${result._id}`);
                }}
              >
                <img src={result.thumbnail} alt="thumbnail" className="w-16 h-16 rounded-md mr-3" />
                <div>
                  <h1 className="text-white font-medium mb-1">{result.title}</h1>
                  <p className="text-gray-400">{result.description}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      }
    </>
  );
}

export default Autocomplete;
export { debouncedAutocomplete };
