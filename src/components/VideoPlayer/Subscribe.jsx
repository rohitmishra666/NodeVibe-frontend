import React, { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Subscribe({ channelId }) {


  const user = useSelector(state => state.auth.status)
  const [subscribed, setSubscribed] = useState()

  const subscribeHandler = async () => {

    try {
      if (!user) {
        // TODO TOAST: Login to Subcribe the channel
        console.log('Login to Subscribe the channel')
        return
      }

      const response = await axios.post(import.meta.env.VITE_SUBSCRIPTION_URL + `/c/${channelId}`,
        {},
        {
          withCredentials: true,
        }
      )

      // console.log(response.data.data)
      setSubscribed(response.data.data.subscribed)
      //SHOW TOAST accordingly
    }

    catch (error) {
      console.error('Error subscribing channel: ', error)
    }
  }

  return (
    <Button
      onClick={subscribeHandler}
      className={`${!subscribed ? 'bg-red-500' : 'bg-gray-500 hover:bg-gray-500'}`} variant="destructive"
    >{!subscribed ? 'Subscribe' : 'Subscribed'}</Button>
  )
}

export default Subscribe