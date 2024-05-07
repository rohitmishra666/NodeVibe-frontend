import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer(props) {
  return (
    <div>
      <ReactPlayer
        url={props.url}
        controls={true}
        playing={true}
      />
      <div>
        <div className='text-white'>Title</div>
        <div>
          <div className='text-white flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
              <Avatar>AUTHOR</Avatar>
              <button>Subscribe</button>
            </div>
            <div className='flex flex-row gap-3'>
              <button>Like</button>
              <button>Dislike</button>
              <button>Share</button>
              <button>AddToPlaylist</button>
            </div>
          </div>
        </div>
        <div className='text-white'>Description</div>
      </div>
    </div>
  )
}

export default VideoPlayer