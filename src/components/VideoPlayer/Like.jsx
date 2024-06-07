import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import like from '@/utils/like.utils.js'
import { toast } from 'react-toastify'

function Like({isLiked=false}) {

  const param = useParams()
  const user = useSelector(state => state.auth.status)
  const [liked, setLiked] = useState(isLiked)
  const likeHandler = async () => {
    try {
      if(!user) {
        // TODO TOAST: Login to like the video
        toast.error('Login to like the video')
        return
      }

      const response = await like.toggleVideoLike({ videoId: param.videoId })
      console.log(response)
      // //response.data.data.liked = true / false
      setLiked(response.data.data.liked)
      toast.success(`Video ${response.data.data.liked ? 'liked' : 'unliked'}`)
    }
    catch(error) {
      console.error('Error liking video: ', error)
    }
  }

  return (
    <div>
      <button
        className='p-1 mt-[1px]'
        onClick={likeHandler}
      >
        <lord-icon
          src="https://cdn.lordicon.com/jjoolpwc.json"
          trigger="hover"
          stroke="bold"
          colors={!liked ? "primary:#ffffff,secondary:#ffffff": "primary:#9cf4df,secondary:#d4f49c"}
        >
        </lord-icon>
      </button>
    </div>
  )
}

export default Like