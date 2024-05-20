import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Like() {

  const param = useParams()
  const user = useSelector(state => state.auth.status)
  
  const likeHandler = async () => {

    try {
      if(!user) {
        // TODO TOAST: Login to like the video
        console.log('Login to like the video')
        return
      }

      const response = await axios.post(import.meta.env.VITE_LIKES_URL + `/toggle/v/${param.videoId}`,
        {},
        {
          withCredentials: true,
        }
      )
      console.log(response)
      //response.data.data.liked = true / false
      //SHOW TOAST accordingly
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
        >
        </lord-icon>
      </button>
    </div>
  )
}

export default Like