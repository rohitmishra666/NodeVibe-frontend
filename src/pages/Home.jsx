import React, { useEffect, useState } from 'react'
import videoUtils from '../utils/video.utils'
import VideoCard from '../components/VideoCard/VideoCard'
import { v4 as uuid } from 'uuid'

function Home() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    videoUtils.getAllVideos()
      .then((response)=>{
        // console.log(response)
        setVideos(response.data.data.allVideos)
      })
    }, [])

  return (
    <div className="w-full flex flex-wrap gap-4 p-2 bg-inherit h-auto">
      {videos && videos.map((video) => (
        
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