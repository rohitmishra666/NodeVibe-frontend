import React, { useRef, useState } from 'react';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddToPlaylist() {
  const user = useSelector((state) => state.auth.userData);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const param = useParams();

  const handleCheckboxChange = async (playlistId, isChecked) => {
    const action = isChecked ? removeVideoFromPlaylist : addVideoToPlaylist;
    toast.promise(action({ playlistId }), {
      pending: isChecked ? 'Removing video from playlist...' : 'Adding video to playlist...',
      success: isChecked ? 'Video removed from playlist!' : 'Video added to playlist!',
      error: 'Error updating playlist',
    });

    setUserPlaylist((prevUserPlaylist) =>
      prevUserPlaylist.map((playlist) => {
        if (playlist._id === playlistId) {
          const newVideos = isChecked
            ? playlist.videos.filter((video) => video !== param.videoId)
            : [...playlist.videos, { _id: param.videoId }];
          return { ...playlist, videos: newVideos, isChecked: !isChecked };
        }
        return playlist;
      })
    );
  };

  const addVideoToPlaylist = async ({ playlistId }) => {
    try {
      const addVideo = await playlist.addVideoToPlaylist({
        playlistId: playlistId,
        videoId: param.videoId,
      });
      return addVideo;
    } catch (error) {
      throw new Error('Error adding video to playlist');
    }
  };

  const removeVideoFromPlaylist = async ({ playlistId }) => {
    try {
      const removeVideo = await playlist.removeVideoFromPlaylist({
        playlistId: playlistId,
        videoId: param.videoId,
      });
      return removeVideo;
    } catch (error) {
      throw new Error('Error removing video from playlist');
    }
  };

  const createNewPlaylist = async () => {
    try {
      const newPlaylist = await playlist.createPlaylist({
        playlistName: nameRef.current.value,
        description: descriptionRef.current.value,
      });

      await addVideoToPlaylist({
        playlistId: newPlaylist.data.data.playlist._id,
      });

      // Close the modal after success
      setDialogOpen(false);
      setShowNewPlaylistForm(false);
    } catch (error) {
      throw new Error('Error creating playlist');
    }
  };

  const getUserPlaylist = async () => {
    try {
      const userPlaylist = await playlist.getUserPlaylists({ userId: user._id });
      const updatedPlaylist = userPlaylist.data.data.userPlaylists.map((playlist) => {
        return {
          ...playlist,
          isChecked: playlist.videos.some((video) => video === param.videoId),
        };
      });
      setShowNewPlaylistForm(false);
      setUserPlaylist(updatedPlaylist);
    } catch (error) {
      console.log('Error getting user playlists: ', error);
    }
  };

  const playlistHandler = async () => {
    try {
      if (!user) {
        toast.error('Login to add to playlist');
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button onClick={playlistHandler}>
            <lord-icon
              src="https://cdn.lordicon.com/ktcdipjm.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff,secondary:#9cf4df"
            ></lord-icon>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[300px] bg-gray-800 p-4">
          <DialogHeader>
            <DialogTitle className='text-white'>Add to Playlist</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4 text-center w-full">
            <ul className="list-none w-full">
              {userPlaylist &&
                userPlaylist.map((playlist) => (
                  <li key={playlist._id} className="flex items-center w-[50%] ml-20 mb-2">
                    <input
                      type="checkbox"
                      id={playlist._id}
                      checked={playlist.isChecked}
                      className="h-5 w-5"
                      onChange={() => handleCheckboxChange(playlist._id, playlist.isChecked)}
                    />
                    <label
                      className="text-white cursor-pointer ml-2"
                      htmlFor={playlist._id}
                    >
                      {playlist.name}
                    </label>
                  </li>
                ))}
            </ul>
            {!showNewPlaylistForm && 
            <Button 
            onClick={() => setShowNewPlaylistForm((prev) => !prev)} 
            className="mt-4 bg-blue-500 hover:bg-green-600">
              Create
            </Button>}
            {showNewPlaylistForm && (
              <>
                <div className="flex flex-col w-full mt-4">
                  <div className="flex flex-row items-center mb-2">
                    <Label htmlFor="name" className="w-2/4 text-right text-white text-base pr-2">Name</Label>
                    <Input id="name" ref={nameRef} className="w-full px-4 py-2 text-white text-base bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="flex flex-row items-center mb-2">
                    <Label htmlFor="description" className="w-2/4 text-right text-white text-base pr-2">Description</Label>
                    <Input id="description" ref={descriptionRef} className="w-full px-4 py-2 text-white text-base bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
                <DialogFooter className="w-full flex justify-end mt-4">
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 mr-2"
                    onClick={() => setShowNewPlaylistForm((prev) => !prev)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() =>
                      toast.promise(createNewPlaylist(), {
                        pending: 'Creating playlist...',
                        success: 'Playlist created and video added!',
                        error: 'Error creating playlist',
                      })
                    }
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default AddToPlaylist;
