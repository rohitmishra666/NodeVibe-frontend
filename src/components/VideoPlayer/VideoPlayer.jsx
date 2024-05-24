import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import ReactPlayer from 'react-player'
import Subscribe from './Subscribe'
import Like from './Like'
import Dislike from './Dislike'
import Share from './Share'
import AddToPlaylist from './AddToPlaylist'

function VideoPlayer(props) {
  
  // console.log(props, 'props')

  return (
    <div>
      <ReactPlayer
        url={props.data.videoFile}
        controls={true}
        playing={true}
      />
      <div>
        <div className='text-white'>{props.data.title}</div>
        <div>
          <div className='text-white flex flex-row justify-between'>
            <div className='flex flex-row gap-2'>
              <Avatar>
                <AvatarImage 
                className='rounded-full h-12 w-12 overflow-hidden object-cover'
                src={props.data.avatar} 
                alt={props.data.username} />
                {props.data.username || "AVATAR"}
                </Avatar>
              <Subscribe channelId = {props.data.owner}/>
            </div>
            <div className='flex flex-row gap-3'>
              <div className='p-1 mt-[1px]'>{props.data.likesCount || ""}</div>
              <Like />
              <Dislike />
              <Share />
              <AddToPlaylist />
            </div>
          </div>
        </div>
        <div className='text-white'>{props.data.views}</div>
        <div className='text-white'>{props.data.description}</div>
      </div>
    </div>
  )
}

export default VideoPlayer