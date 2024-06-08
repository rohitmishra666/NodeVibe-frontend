import axios from "axios";

export class Like {

    async toggleVideoLike({ videoId }) {
        try {
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            console.log(localStorage.getItem("accessToken"))
            return await axios.post(import.meta.env.VITE_LIKES_URL + `/toggle/v/${videoId}`,
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("toggleVideoLike :: error", error)
        }
    }

    async toggleCommentLike({ commentId }) {
        try {
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            return await axios.post(
                `${import.meta.env.VITE_LIKES_URL}/toggle/c/${commentId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    }
                },
                {
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("toggleCommentLike :: error", error)
        }
    }

    async getLikedVideos() {
        try {
            const accessToken = JSON.parse(localStorage.getItem("accessToken"))
            return await axios.get(
                `${import.meta.env.VITE_LIKES_URL}/videos`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("getLikedVideos :: error", error)
        }
    }
}

const like = new Like();
export default like;