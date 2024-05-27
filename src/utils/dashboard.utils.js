import axios from 'axios'
export class Dashboard{

    async getChannelStats() {
        try {
            return await axios.get(
                `${import.meta.env.VITE_DASHBOARD_URL}/stats`,
                {
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("getChannelStats :: error", error)
        }
    }

    async getChannelVideos() {
        try {
            return await axios.get(
                `${import.meta.env.VITE_DASHBOARD_URL}/videos`,
                {
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("getChannelVideos :: error", error)
        }
    }
}

const dashboard = new Dashboard();
export default dashboard