import axios from 'axios'
export class Dashboard {

    async getChannelStats() {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.get(
                `${import.meta.env.VITE_DASHBOARD_URL}/stats`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("getChannelStats :: error", error)
        }
    }

    async getChannelVideos() {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.get(
                `${import.meta.env.VITE_DASHBOARD_URL}/videos`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
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