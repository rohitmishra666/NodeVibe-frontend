import React, { useEffect, useRef, useState } from 'react';
import playlist from '../../utils/playlist.utils';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function AddToPlaylist() {

  const user = useSelector(state => state.auth.userData);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const param = useParams();

  const handleCheckboxChange = async (playlistId, isChecked) => {
    if (isChecked) {
      await removeVideoFromPlaylist({ playlistId });

    } else {
      await addVideoToPlaylist({ playlistId });
    }
    setUserPlaylist((prevUserPlaylist) =>
      prevUserPlaylist.map((playlist) => {
        if (playlist._id === playlistId) {
          const newVideos = isChecked
            ? playlist.videos.filter(video => video !== param.videoId)
            : [...playlist.videos, { _id: param.videoId }];
          return { ...playlist, videos: newVideos, isChecked: !isChecked};
        }
        console.log(playlist, 'playlist');
        return playlist;
      })
    );
    // getUserPlaylist();
  };

  const addVideoToPlaylist = async ({ playlistId }) => {
    try {
      const addVideo = await playlist.addVideoToPlaylist({
        playlistId: playlistId,
        videoId: param.videoId
      });
      console.log(addVideo);
      return addVideo;
    } catch (error) {
      console.log('Error adding video to playlist: ', error);
    }
  };

  const removeVideoFromPlaylist = async ({ playlistId }) => {
    try {
      const removeVideo = await playlist.removeVideoFromPlaylist({
        playlistId: playlistId,
        videoId: param.videoId
      });
      console.log(removeVideo);
      return removeVideo;
    } catch (error) {
      console.log('Error removing video from playlist: ', error);
    }
  };

  const createNewPlaylist = async () => {
    try {
      const newPlaylist = await playlist.createPlaylist({
        playlistName: nameRef.current.value,
        description: descriptionRef.current.value,
      });
      console.log(newPlaylist);

      const addedVideo = await addVideoToPlaylist({
        playlistId: newPlaylist.data.data.playlist._id,
      });
      console.log(addedVideo);
      await getUserPlaylist(); // Update the playlist after creating a new one
    } catch (error) {
      console.log('Error creating playlist: ', error);
    }
  };

  const getUserPlaylist = async () => {
    try {
      const userPlaylist = await playlist.getUserPlaylists({ userId: user._id });
      const updatedPlaylist = userPlaylist.data.data.userPlaylists
        .map((playlist) => {
          return {
            ...playlist,
            isChecked: playlist.videos.some(video => video === param.videoId)
          }
         });
         console.log(updatedPlaylist, 'updatedPlaylist');
      setUserPlaylist(updatedPlaylist);
      // console.log(userPlaylist, 'userPlaylist');
    } catch (error) {
      console.log('Error getting user playlists: ', error);
    }
  };

  const playlistHandler = async () => {
    try {
      if (!user) {
        console.log('Login to add to playlist');
        return null;
      }
      await getUserPlaylist();
    } catch (error) {
      console.log('Error getting user playlists: ', error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button onClick={playlistHandler} className='pt-1'>
            <lord-icon
              src="https://cdn.lordicon.com/ktcdipjm.json"
              trigger="hover"
              stroke="bold"
            >
            </lord-icon>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] bg-gray-600">
          <DialogHeader>
            <DialogTitle>Add to Playlist</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">

            {userPlaylist && userPlaylist.map((playlist) => {

              // const isChecked = playlist.videos.some(video => {
              //   return video === param.videoId;
              // });

              // console.log(isChecked, 'isChecked');

              return (
                <div key={playlist._id} className="flex flex-row gap-1 justify-center items-center">
                  <input
                    type="checkbox"
                    id={playlist._id}
                    checked={playlist.isChecked}
                    onChange={() => {
                      handleCheckboxChange(playlist._id, playlist.isChecked)
                    }}
                  />
                  <label htmlFor={playlist._id}>{playlist.name}</label>
                </div>
              );
            })}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" ref={nameRef} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" ref={descriptionRef} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createNewPlaylist}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddToPlaylist;
