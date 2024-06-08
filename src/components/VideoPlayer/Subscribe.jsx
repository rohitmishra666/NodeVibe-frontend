import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import subscriptionUtils from '@/utils/subscription.utils'
import { toast } from 'react-toastify'

function Subscribe({ channelId }) {
  const user = useSelector(state => state.auth.status)
  const userData = useSelector(state => state.auth.userData)
  const [subscribed, setSubscribed] = useState()

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      try {
        const response = await subscriptionUtils.getSubscribedChannels({ subscriberId: userData._id })
        const matched = response.data.data.channels.some(channel => channel._id === channelId)
        setSubscribed(matched)
      } catch (error) {
        console.error('Error fetching subscribed channels: ', error)
      }
    }

    if (user) {
      fetchSubscribedChannels()
    }
  }, [channelId, user, userData])

  const subscribeHandler = async () => {
    try {
      if (!user) {
        // TODO TOAST: Login to Subcribe the channel
        toast.error('Login to Subscribe the channel')
        return
      }
      const response = await subscriptionUtils.toggleSubscription({ channelId })
      setSubscribed(response.data.data.subscribed)
      //SHOW TOAST accordingly
      if (response.data.data.subscribed) {
        toast.success('Subscribed to the channel')
      } else {
        toast.success('Unsubscribed from the channel')
      }
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