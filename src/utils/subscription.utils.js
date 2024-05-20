import axios from 'axios'

export class Subscription {

    async toggleSubscription({ channelId }) {
        try {
            return await axios.post(
                `${import.meta.env.VITE_SUBSCRIPTION_URL}/c/${channelId}`,
                {},
                {
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("toggleSubscription :: error", error)
        }
    }

    async getUserChannelSubscribers({ channelId }) {
        try {
            return await axios.get(
                `${import.meta.env.VITE_SUBSCRIPTION_URL}/c/${channelId}`,
            )
        } catch (error) {
            console.log("getUserChannelSubscribers :: error", error)
        }
    }

    async getSubscribedChannels({ subscriberId }) {
        try {
            return await axios.get(
                `${import.meta.env.VITE_SUBSCRIPTION_URL}/u/${subscriberId}`,
            )
        } catch (error) {
            console.log("getSubscribedChannels :: error", error)
        }
    }
}

const subscription = new Subscription();
export default subscription