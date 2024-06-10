import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import CommentOpener from '../pages/CommentOpener';
import videoUtils from '../utils/video.utils';

function Video() {
  const [video, setVideo] = useState(null);
  const { videoId } = useParams();

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await videoUtils.getVideoById({ videoId });
        const videoData = response.data.data.video[0];
        setVideo(videoData);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }

    fetchVideo();
  }, [videoId]);

  return (
    <div className="container mx-auto mt-6 px-4">
      {video && (
        <>
          <VideoPlayer data={video} />
          <CommentOpener videoId={videoId} />
        </>
      )}
    </div>
  );
}

export default Video;
