import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
import CommentOpener from '../pages/CommentOpener'
import videoUtils from '../utils/video.utils'

function Video() {

  const [video, setVideo] = useState(null)
  const param = useParams()

  useEffect(() => {
    async function getVideo() {
      // const response = await axios.get(import.meta.env.VITE_VIDEO_URL + `/${param.videoId}`)
      const response = await videoUtils.getVideoById({ videoId: param.videoId })
      const videoFile = response.data.data.video[0]
      setVideo(videoFile)
    }

    getVideo()
  }, [param.videoId])

  return (
    <>
      {video && (<div>
        <VideoPlayer data={video} />
        <CommentOpener videoId={param.videoId} />
      </div>)}
    </>
  )
}

export default Video