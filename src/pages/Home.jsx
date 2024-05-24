import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard/VideoCard'
import { v4 as uuid } from 'uuid'

function Home() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get(import.meta.env.VITE_VIDEO_URL).then((response) => {
      // console.log(response.data.data.allVideos[0].views, 'videos to be send in videocard')
      setVideos(response.data.data.allVideos)
    })

  }, [])

  return (
    <div className="w-full flex flex-wrap gap-4 p-2 bg-red-500">
      {videos.map((video) => (
        
        <VideoCard
          key={uuid()}
          thumbnail={video.thumbnail}
          title={video.title}
          description={video.description}
          duration={video.duration}
          date={video.createdAt}
          author={video.username}
          id={video._id}
          avatar={video.avatar}
          views={video.views}
          />
      ))}
    </div>
  )
}

export default Home