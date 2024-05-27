import axios from 'axios';
export class Video {

    async getAllVideos() {
        try {
            return await axios.get(import.meta.env.VITE_VIDEO_URL)
        } catch (error) {
            console.log("getAllVideos :: error", error)
        }
    }

    async publishVideo({ title, description, videoFile, thumbnail }) {
        try {
            return await axios.post(
                import.meta.env.VITE_VIDEO_URL + "/publish",
                {
                    title: title,
                    description: description,
                    thumbnail: thumbnail,
                    videoFile: videoFile
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("publishVideo :: error", error)
        }
    }

    async getVideoById({ videoId }) {
        try {
            return await axios.get(`${import.meta.env.VITE_VIDEO_URL}/${videoId}`)
        } catch (error) {
            console.log("getVideoById :: error", error)
        }
    }

    async updateVideo({ videoId, title, description, thumbnail }) {
        try {
            return await axios.patch(
                `${import.meta.env.VITE_VIDEO_URL}/${videoId}`,
                { title, description, thumbnail },
                {
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("updateVideo :: error", error)
        }
    }

    async deleteVideo({ videoId }) {
        try {
            return await axios.delete(`${import.meta.env.VITE_VIDEO_URL}/${videoId}`)
        } catch (error) {
            console.log("deleteVideo :: error", error)
        }
    }

    async toggleStatus({ videoId }) {
        try {
            return await axios.patch(
                `${import.meta.env.VITE_VIDEO_URL}/toggle/publish/${videoId}`,
                {},
                {
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("toggleStatus :: error", error)
        }
    }
}
const video = new Video();
export default video