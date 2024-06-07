import React, { useState, useEffect } from 'react';
import { FaUser, FaHeart, FaEye, FaPlus, FaVideo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import dashboard from '@/utils/dashboard.utils';
import { formatDate } from '@/utils/timeAgo.utils';
import videoUtils from '@/utils/video.utils';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleHtmlError } from '@/utils/error.utils';

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [videos, setVideos] = useState([]);
  const [channelStats, setChannelStats] = useState({});
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const channelStats = await dashboard.getChannelStats();
      const channelVideos = await dashboard.getChannelVideos();
      setChannelStats(channelStats.data.data.stats);
      setVideos(channelVideos.data.data.videos);
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    if (editMode && data.title && data.description && data.thumbnail[0]) {
      await toast.promise(
        videoUtils.updateVideo(data, editVideoId),
        {
          pending: 'Updating video...',
          success: 'Video updated successfully!',
          error: 'Error updating video!'
        }
      );
    } else {
      const id = await toast.promise(
        videoUtils.publishVideo(data),
        {
          pending: 'Uploading video...',
          success: {
            render({ data }) {
              console.log(data, "This is data");
              if (data.data.statusCode == 201) {
                return 'Video uploaded successfully!';
              }
              else {
                toast.update(id, { 
                  type: 'error', render: 'Error uploading video!'});
              }
            },
          },
          error: {
            render({ data }) {
              console.log(handleHtmlError(data), "This is error");
              return 'Error uploading video!';
            }
          }
        }
      );
    }
    const channelVideos = await dashboard.getChannelVideos();
    setVideos(channelVideos.data.data.videos);
    reset();
    setShowModal(false);
    setEditMode(false);
  };

  const deleteVideo = async (videoId) => {
    await toast.promise(
      videoUtils.deleteVideo({ videoId }),
      {
        pending: 'Deleting video...',
        success: 'Video deleted successfully!',
        error: 'Error deleting video!'
      }
    );
    setVideos(videos.filter(video => video._id !== videoId));
  };

  const editVideo = (video) => {
    setEditMode(true);
    setEditVideoId(video._id);
    setValue('title', video.title);
    setValue('description', video.description);
    setShowModal(true);
  };

  const openUploadModal = () => {
    setEditMode(false);
    setEditVideoId(null);
    reset();
    setShowModal(true);
  };

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen w-full">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome Back, <b>{userData?.fullName}</b></h1>
        <div className="flex justify-around mt-6">
          <StatItem icon={<FaEye />} label="Total views" value={channelStats?.totalViews} />
          <StatItem icon={<FaUser />} label="Total subscribers" value={channelStats?.totalSubcribers} />
          <StatItem icon={<FaVideo />} label="Total Videos" value={channelStats?.totalVideos} />
        </div>
        <button
          onClick={openUploadModal}
          className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center"
        >
          <FaPlus className="mr-2" /> Upload video
        </button>
      </header>
      <div className="w-full overflow-x-auto">
        <table className="bg-gray-800 rounded-lg w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Thumbnail</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Likes</th>
              <th className="px-4 py-2">Date uploaded</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={uuid()} className="bg-gray-700 odd:bg-gray-600">
                <td className="px-4 py-2 text-center"><StatusToggle status={video.isPublished} id={video._id} /></td>
                <td className="px-4 py-2 text-center"><img src={video.thumbnail} alt={video.title} className="w-12 h-12 rounded-full mx-auto" /></td>
                <td className="px-4 py-2 text-center">{video.title}</td>
                <td className="px-4 py-2 text-center">{video.likes} likes</td>
                <td className="px-4 py-2 text-center">{formatDate(video.createdAt.slice(0, 10))}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => editVideo(video)}>✏️</button>
                  <button
                    onClick={() => deleteVideo(video._id)}
                    className="text-red-500 hover:text-red-700">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg relative">
            <button className="absolute top-2 right-2 text-3xl text-gray-400 hover:text-white" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2 className="text-xl mb-4">{editMode ? 'Edit Video' : 'Upload New Video'}</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
              </div>
              <div>
                <label className="block text-sm">Description</label>
                <input
                  type="text"
                  {...register('description', { required: 'Description is required' })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
              </div>
              <div>
                <label className="block text-sm">Thumbnail</label>
                <input
                  className="w-full px-4 py-2 h-auto bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  type="file"
                  accept='image/*'
                  {...register('thumbnail', { required: 'Thumbnail is required' })}
                />
                {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
              </div>
              {!editMode && (
                <div>
                  <label className="block text-sm">Video</label>
                  <input
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="file"
                    accept='video/*'
                    {...register('videoFile', { required: 'Video file is required' })}
                  />
                  {errors.videoFile && <span className="text-red-500">{errors.videoFile.message}</span>}
                </div>
              )}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                  {editMode ? 'Save Changes' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-3xl mr-4">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold">{label}</h2>
      <p className="text-lg">{value}</p>
    </div>
  </div>
);

const StatusToggle = ({ status, id }) => {
  const [isPublished, setIsPublished] = useState(status);

  const toggleStatus = async () => {
    await toast.promise(
      videoUtils.toggleStatus({ videoId: id }),
      {
        pending: 'Toggling status...',
        success: {
          render({ data }) {
            console.log(data, "This is data");
            if (data.data.statusCode === 209) {
              return `Video ${data.data.data.publishStatus ? 'published' : 'unpublished'} successfully!`;
            }
          },
        },
        error: 'Error toggling status!'
      }
    );
    setIsPublished((prev)=>  !prev);
    
  };

  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input type="checkbox" checked={isPublished} onChange={toggleStatus} className="sr-only" />
      <div className="w-10 h-6 bg-gray-400 rounded-full shadow-inner"></div>
      <div className={`dot w-4 h-4 bg-white rounded-full shadow absolute transform transition-transform ${isPublished ? 'translate-x-5' : 'translate-x-1'}`}></div>
      <span className={`ml-3 ${isPublished ? 'text-green-500' : 'text-red-500'}`}>
        {isPublished ? 'Published' : 'Unpublished'}
      </span>
    </label>
  );
};

export default Profile;
