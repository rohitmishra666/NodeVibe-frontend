import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import VideoCard from '../components/VideoCard/VideoCard';
import likeUtils from '@/utils/like.utils';

// Sample data for liked videos

function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    // Fetch liked videos
    const fetchLikedVideos = async () => {
      try {
        const response = await likeUtils.getLikedVideos();
        setLikedVideos(response.data.data.likedVideos);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    };

    fetchLikedVideos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Liked Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {likedVideos.map(video => (
          <VideoCard
            key={uuid()}
            thumbnail={video.thumbnail}
            title={video.title}
            description={video.description}
            duration={video.duration}
            date={video.createdAt}
            author={video.owner.username}
            id={video._id}
            avatar={video.owner.avatar}
            views={video.views}
          />
        ))}
      </div>
    </div>
  );
}

export default LikedVideos;
