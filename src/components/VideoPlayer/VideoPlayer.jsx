import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import ReactPlayer from 'react-player';
import Subscribe from './Subscribe';
import Like from './Like';
import Dislike from './Dislike';
import Share from './Share';
import AddToPlaylist from './AddToPlaylist';
import { Link } from 'react-router-dom';

function VideoPlayer(props) {
  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="w-auto mb-4">
        <ReactPlayer
          url={props.data.videoFile}
          controls={true}
          playing={true}
          width="100%"
          height="100%"
          className="aspect-w-16 aspect-h-9"
        />
      </div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mb-2">{props.data.title}</h1>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <Link to={`/channel/${props.data.username}/home`} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  className="rounded-full h-14 w-14 object-cover"
                  src={props.data.avatar}
                  alt={props.data.username}
                />
                <AvatarFallback >
                <div className="w-14 h-14 rounded-full bg-gray-300 text-black text-xl">
                        <img
                            src="https://via.placeholder.com/"
                            alt={props.data.username}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </AvatarFallback>
              </Avatar>
              <span className="text-lg font-medium">{props.data.username}</span>
            </Link>
            <Subscribe channelId={props.data.owner} />
          </div>
          <div className="flex items-center gap-4">
            <span>{props.data.likesCount}</span>
            <Like isLiked={props.data.isLiked} />
            <Dislike />
            <Share />
            <AddToPlaylist />
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <span>{props.data.views} views</span>
          <span>•</span>
          <span>{new Date(props.data.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="text-gray-200">
          <p>{props.data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
