import React from 'react';
import { useNavigate } from 'react-router-dom';
import { timeAgo, time } from '@/utils/timeAgo.utils';

function VideoCard({
  thumbnail = "",
  title = "",
  description = "",
  duration = "5min",
  avatar = "",
  views,
  date = "",
  author = "vines",
  id = ""
}) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-full max-w-sm md:max-w-xs rounded-lg overflow-hidden shadow-lg bg-cool-gray-100 cursor-pointer transition-transform transform hover:scale-105 mb-4"
      onClick={() => navigate(`/watch/${id}`)}
    >
      <div
        className="relative h-36 w-full bg-cover bg-center md:h-48"
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
      >
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-s px-1 rounded">{time(duration)}</div>
      </div>
      <div className="flex flex-col p-4">
        <h1 className="text-lg font-semibold text-white line-clamp-2">{title}</h1>
        <div className="mt-2 text-gray-300 line-clamp-2">{description}</div>
        <div className="mt-4 flex items-center text-sm text-gray-400">
          <span>{views} views</span>
          <span className="mx-1">•</span>
          <span>{timeAgo(date)}</span>
        </div>
        <div className="mt-4 flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={avatar}
            alt={author}
          />
          <div className="ml-2 text-sm">
            <p className="text-gray-400">{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
