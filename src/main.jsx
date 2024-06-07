import React from 'react';
import ReactDOM from 'react-dom/client';

// components
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Video from './pages/Video.jsx';
import Search from './pages/Search.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import './index.css';
import ChannelPage from './pages/Channel/ChannelPage.jsx';
import ChannelHome from './pages/Channel/ChannelHome.jsx';
import ChannelPlaylists from './pages/Channel/ChannelPlaylists.jsx';
import PlaylistContent from './pages/Channel/PlaylistContent.jsx';
import LikedVideos from './pages/LikedVideos.jsx';
import Settings from './pages/Settings.jsx';
// react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// redux
import store from './store/store';
import { Provider } from 'react-redux';
import WatchHistory from './pages/WatchHistory.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: 'like',
        element: (
          <AuthLayout authentication={true}>
            <LikedVideos />
          </AuthLayout>
        ),
      },
      {
        path: 'settings',
        element: (
          <AuthLayout authentication={true}>
            <Settings />
          </AuthLayout>
        ),
      },
      {
        path: 'watchHistory',
        element: (
          <AuthLayout authentication={true}>
            <WatchHistory />
          </AuthLayout>
        ),
      },
      {
        path: '/watch/:videoId',
        element: (
          <AuthLayout authentication={false}>
            <Video />
          </AuthLayout>
        ),
      },
      {
        path: '/search/:query',
        element: (
          <AuthLayout authentication={false}>
            <Search />
          </AuthLayout>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/profile',
        element: (
          <AuthLayout authentication={false}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: 'channel/:username',
        element: (
          <AuthLayout authentication={false}>
            <ChannelPage />
          </AuthLayout>
        ),
        children: [
          {
            path: 'home',
            element: <ChannelHome />
          },
          {
            path: 'playlist/:userId',
            element: <ChannelPlaylists />,
          },
          {
            path: ':playlistId',
            element: <PlaylistContent />
          }
        ],
      },
      {
        path: '/about',
        element: (
          <div className="w-full h-screen text-white text-4xl bg-zinc-600 flex items-center justify-center">
            About Page
          </div>
        ),
      },
      {
        path: '*',
        element: (
          <div className="w-full h-screen text-white text-4xl bg-zinc-600 flex items-center justify-center">
            Error : 404
            <br />
            Page Not Found
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
