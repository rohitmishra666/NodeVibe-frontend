import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from '@/components/VideoPlayer'
import CommentOpener from '../pages/CommentOpener'
import axios from 'axios'


function Video() {

  const [video, setVideo] = useState(null)
  const param = useParams()

  useEffect(() => {
    async function getVideo() {
      const response = await axios.get(import.meta.env.VITE_VIDEO_URL + `/${param.videoId}`)
      const videoFileUrl = response.data.data.video.videoFile
      console.log(videoFileUrl)
      setVideo(videoFileUrl)
    }
    getVideo()
  }, [param.videoId])

  return (
    video && (<div>
      <VideoPlayer url={`${video}`} />
      <CommentOpener videoId={`${param.videoId}`} />
    </div>)
  )
}

export default Video