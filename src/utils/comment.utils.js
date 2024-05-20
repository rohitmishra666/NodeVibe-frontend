import axios from 'axios'

export class Comment {

    async getVideoComments({ videoId }) {
        try {
            return await axios.get(
                `${import.meta.env.VITE_COMMENT_URL}/video/${videoId}`,
            )
        } catch (error) {
            console.log("getVideoComments :: error", error)
        }
    }

    async addComment({ videoId, comment }) {
        try {
            return await axios.post(
                `${import.meta.env.VITE_COMMENT_URL}/add/${videoId}`,
                {
                    content: comment,
                },
                {
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("addComment :: error", error)
        }
    }

    async deleteComment({ commentId }) {
        try {
            return await axios.delete(
                `${import.meta.env.VITE_COMMENT_URL}/c/${commentId}`,
            )
        } catch (error) {
            console.log("deleteComment :: error", error)
        }
    }

    async updateComment({ commentId, comment }) {
        try {
            return await axios.patch(
                `${import.meta.env.VITE_COMMENT_URL}/${commentId}`,
                {
                    comment: comment,
                },
                {
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("updateComment :: error", error)
        }
    }

}

const comment = new Comment();
export default comment;