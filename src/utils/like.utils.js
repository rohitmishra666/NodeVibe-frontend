import axios from "axios";
const accessToken = JSON.parse(localStorage.getItem("accessToken"))
export class Like {

    async toggleVideoLike({ videoId }) {
        try {
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