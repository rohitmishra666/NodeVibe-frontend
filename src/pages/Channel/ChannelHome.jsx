import React, { useEffect, useState } from 'react';
import videoUtils from '../../utils/video.utils.js';
import VideoCard from '../../components/VideoCard/VideoCard.jsx';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';

function ChannelHome() {
  const { username } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelVideos = await videoUtils.getAllVideos();
        const filteredVideos = channelVideos.data.data.allVideos.filter(
          (video) => video.username === username
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchData();
  }, [username]);

  return (
    <div className="w-full flex flex-wrap gap-4 p-2 bg-inherit h-auto">
      {videos.length > 0 ?
      videos.map((video) => (
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
      )) : (
        <div className="w-full h-full text-center text-2xl text-gray-400">
          No videos found
        </div>
      )}
    </div>
  );
}

export default ChannelHome;
