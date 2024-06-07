import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import playlistUtils from '../../utils/playlist.utils';
import VideoCard from '../../components/VideoCard/VideoCard';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlaylistContent() {
  const userStatus = useSelector((state) => state.auth.status);
  const userData= useSelector((state) => state.auth.userData);
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchPlaylistContent = async () => {
      try {
        const response = await playlistUtils.getPlaylistById({ playlistId });
        const fetchedPlaylist = response.data.data.playlist[0];
        setPlaylist(fetchedPlaylist);
        setFormData({
          name: fetchedPlaylist.name,
          description: fetchedPlaylist.description
        });
      } catch (error) {
        console.error('Error fetching playlist content:', error);
      }
    };

    fetchPlaylistContent();
  }, [playlistId]);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the playlist with the new name and description
      console.log('Updating playlist:', formData);
      const response = await playlistUtils.updatePlaylist({ playlistId, playlistName: formData.name, description: formData.description });
      console.log(response, 'response');
      setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        name: formData.name,
        description: formData.description
      }));
      setEditDialogOpen(false);
      toast.success('Playlist updated successfully!');
    } catch (error) {
      console.error('Error updating playlist:', error);
      toast.error('Failed to update playlist.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await playlistUtils.deletePlaylist({ playlistId });
      window.location.href = `/channel/${userData.username}/playlist/${userData._id}`;
      toast.success('Playlist deleted successfully!');
    } catch (error) {
      console.error('Error deleting playlist:', error);
      toast.error('Failed to delete playlist.');
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 text-white">
      <div className="flex justify-start items-center">
        <div>
          <h2 className="text-2xl mb-1">{playlist.name}</h2>
          <p className="text-base mb-5 text-zinc-400">{playlist.description}</p>
        </div>
        {userStatus && (
          <div className="flex ml-10 gap-2">
            <button onClick={handleEditClick} className="text-blue-500 hover:text-blue-700">
              <FaEdit size={30}/>
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
              <FaTrash size={25}/>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4">
        {playlist.videos.map((video) => (
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

      {editDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-5 rounded-lg">
            <h2 className="text-lg mb-3">Edit Playlist</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="block text-sm">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={handleEditDialogClose} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default PlaylistContent;
