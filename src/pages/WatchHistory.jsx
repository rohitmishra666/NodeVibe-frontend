import React, {useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid'
import VideoCard from '@/components/VideoCard/VideoCard'
import userUtils from '@/utils/user.utils'

function WatchHistory() {
 
  const [watchHistory, setWatchHistory] = useState([])

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        // Fetch watch history
        const response = await userUtils.getUserWatchHistory();
        setWatchHistory(response.data.data.user);
      } catch (error) {
        console.error('Error fetching watch history:', error);
      }
    };

    fetchWatchHistory();
  }, []);

  return (

    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Watch History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {watchHistory.map(video => (
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

export default WatchHistory