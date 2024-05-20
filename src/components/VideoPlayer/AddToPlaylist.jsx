import React from 'react'
import playlist from '../../utils/playlist.utils'
import { useSelector } from 'react-redux'

function AddToPlaylist(){

  const user = useSelector(state => state.auth.userData)

  const playlistHandler = async() => {
    try {
      if(!user) {
        // TODO TOAST: Login to add to playlist
        console.log('Login to add to playlist')
        return null
      }
      const userPlaylist = await playlist.getUserPlaylists({userId: user._id})
      console.log(userPlaylist)

    } catch (error) {
      console.log('Error getting user playlists: ', error)
    }

  }

  return (
    <div >
      <button 
      onClick={playlistHandler}
      className='pt-1'>
        <lord-icon
          src="https://cdn.lordicon.com/ktcdipjm.json"
          trigger="hover"
          stroke="bold"
        >
        </lord-icon>
      </button>
    </div>
  )
}

export default AddToPlaylist