import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../components/VideoCard/VideoCard'

function Home() {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const allVideos = axios.get(import.meta.env.VITE_VIDEO_URL).then((response) => {
      setVideos(response.data.data.video)
    })
  }, [])

  return (
    <div className="w-full flex flex-wrap bg-red-500">
      {videos.map((video) => (
        <VideoCard
          key={Date.now()}
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

export default Home