import axios from 'axios';
export class Video {

    async getAllVideos() {
        try {
            return await axios.get(import.meta.env.VITE_VIDEO_URL + '/',
                {
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("getAllVideos :: error", error)
        }
    }

    async publishVideo(data) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.post(
                import.meta.env.VITE_VIDEO_URL + "/publish",
                {
                    title: data.title,
                    description: data.description,
                    thumbnail: data.thumbnail[0],
                    videoFile: data.videoFile[0]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("publishVideo :: error", error)
            return error
        }
    }

    async getVideoById({ videoId }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.get(
                import.meta.env.VITE_VIDEO_URL + `/${videoId}`,
                {   
                    headers: {
                        "Authorization": `Bearer ${accessToken?accessToken:null}`,
                    },
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("getVideoById :: error", error)
        }
    }

    async updateVideo(data, videoId) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.patch(
                `${import.meta.env.VITE_VIDEO_URL}/${videoId}`,
                {
                    title: data.title,
                    description: data.description,
                    thumbnail: data.thumbnail[0],
                },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {

            console.log("updateVideo :: error", error)
            return error
        }
    }

    async deleteVideo({ videoId }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.delete(`${import.meta.env.VITE_VIDEO_URL}/${videoId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("deleteVideo :: error", error)
        }
    }

    async toggleStatus({ videoId }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.patch(
                `${import.meta.env.VITE_VIDEO_URL}/toggle/publish/${videoId}`,
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("toggleStatus :: error", error)
            return error
        }
    }
}
const video = new Video();
export default video