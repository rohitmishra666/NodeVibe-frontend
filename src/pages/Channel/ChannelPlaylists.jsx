import React, { useEffect, useState } from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import playlistUtils from '../../utils/playlist.utils';
import PlaylistCard from './PlaylistCard';
import { v4 as uuid } from 'uuid';

function ChannelPlaylists() {
  const { username, userId } = useParams();
  const [playlists, setPlaylists] = useState(
    []
  );

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const channelPlaylists = await playlistUtils.getUserPlaylists({ userId });
        setPlaylists(channelPlaylists.data.data.userPlaylists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists();
  }, [userId]);

  return (
    <div className="w-full flex flex-wrap gap-4 p-2 bg-inherit h-auto">
      {playlists.length > 0 ? playlists.map((playlist) => (
        <NavLink to={`/channel/${username}/${playlist._id}`} key={uuid()}>
          <PlaylistCard
            key={uuid()}
            title={playlist.title}
            description={playlist.description}
            thumbnail={playlist.thumbnail}
            author={username}
            id={playlist._id}
            videosCount={playlist.videos.length}
          />
        </NavLink>
      )) :
        <div className="w-full h-full text-center text-2xl text-gray-400">
          No playlists found
        </div>
      }
    </div>
  );
}

export default ChannelPlaylists;
