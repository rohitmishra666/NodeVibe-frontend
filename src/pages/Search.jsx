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
      setSearchResults(response.data.data.video)
    })
  }, [query])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {searchResults.map((video) => (
        <VideoCard
          key={uuid()}
          thumbnail={video.thumbnail}
          title={video.title}
          description={video.description}
          duration={video.duration}
          date={video.createdAt}
          author={video.owner.username}
          avatar={video.owner.avatar}
          id={video._id}
          views={video.views}
        />
      ))}
    </div>
  )

}

export default Search