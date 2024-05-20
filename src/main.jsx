import React from 'react'
import ReactDOM from 'react-dom/client'

// components
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Video from './pages/Video.jsx'
import Search from './pages/Search.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import Profile from './pages/Profile.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import './index.css'

// react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// redux
import store from './store/store'
import { Provider } from 'react-redux'

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
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/post',
        element: (
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        )
      },
      {
        path: '/profile',
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: '/about',
        element: <div className=' w-full h-screen text-white text-4xl bg-zinc-600 flex items-center justify-center'> About Page</div>,
      },
      {
        path: '*',
        element: <div className=' w-full h-screen text-white text-4xl bg-zinc-600 flex items-center justify-center'> Error :&nbsp;404 <br /> Page Not found</div>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
