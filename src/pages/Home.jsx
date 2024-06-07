import React, { useEffect, useState } from 'react';
import videoUtils from '../utils/video.utils';
import VideoCard from '../components/VideoCard/VideoCard';
import { v4 as uuid } from 'uuid';


function Home() {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    videoUtils.getAllVideos()
    .then((response) => {
      setVideos(response.data.data.allVideos);
    });
  }, []);

  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos && videos.map((video) => (
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
        ))}
      </div>
    </div>
  );
}

export default Home;
