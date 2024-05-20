import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import VideoCard from '../components/VideoCard/VideoCard'
import { v4 as uuid } from 'uuid'

function Search() {

  const { query } = useParams()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios.post(import.meta.env.VITE_VIDEO_URL, { query }).then((response) => {
      console.log(response)
      setSearchResults(response.data.data.video)
    })
  }, [query])

  return (
    <div className="w-full flex flex-wrap bg-red-500">
      {searchResults.map((video) => (
        <VideoCard
          key={uuid()}
          thumbnail={video.thumbnail}
          title={video.title}
          description={video.description}
          duration={video.duration}
          date={video.date}
          author={video.author}
          id={video._id}
        />
      ))}
    </div>
  )

}

export default Search