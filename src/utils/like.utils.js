import axios from "axios";

export class Like {

    async toggleVideoLike({ videoId }) {
        try {
            return await axios.post(import.meta.env.VITE_LIKES_URL + `/toggle/v/${videoId}`,
              {},
              {
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
                {},
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
            )
        } catch (error) {
            console.log("getLikedVideos :: error", error)
        }
    }
}

const like = new Like();
export default like;