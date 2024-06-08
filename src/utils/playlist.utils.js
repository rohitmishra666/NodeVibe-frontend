import axios from "axios";
// ADD HEADERS
export class Playlist {

    async createPlaylist({ playlistName, description }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.post(
                import.meta.env.VITE_PLAYLIST_URL,
                {
                    name: playlistName,
                    description: description,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("createPlaylist :: error", error)
        }
    }

    async getUserPlaylists({ userId }) {
        try {
            return await axios.get(
                import.meta.env.VITE_PLAYLIST_URL + `/user/${userId}`,
                {
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("getUserPlaylists :: error", error)
        }
    }

    async getPlaylistById({ playlistId }) {
        try {
            return await axios.get(
                `${import.meta.env.VITE_PLAYLIST_URL}/${playlistId}`,
            )
        } catch (error) {
            console.log("getPlaylistById :: error", error)
        }
    }

    async addVideoToPlaylist({ playlistId, videoId }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.patch(
                `${import.meta.env.VITE_PLAYLIST_URL}/add/${videoId}/${playlistId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("addVideoToPlaylist :: error", error)
        }
    }

    async removeVideoFromPlaylist({ playlistId, videoId }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.patch(
                `${import.meta.env.VITE_PLAYLIST_URL}/remove/${videoId}/${playlistId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("removeVideoFromPlaylist :: error", error)
        }
    }

    async deletePlaylist({ playlistId }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.delete(
                `${import.meta.env.VITE_PLAYLIST_URL}/${playlistId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                },
            )
        } catch (error) {
            console.log("deletePlaylist :: error", error)
        }
    }

    async updatePlaylist({ playlistId, playlistName, description }) {
        try {
            const accessToken = JSON.parse(localStorage?.getItem("accessToken"))
            return await axios.patch(
                `${import.meta.env.VITE_PLAYLIST_URL}/${playlistId}`,
                {
                    name: playlistName,
                    description: description,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                }
            )
        } catch (error) {
            console.log("updatePlaylist :: error", error)
        }
    }

}

const playlist = new Playlist();
export default playlist;