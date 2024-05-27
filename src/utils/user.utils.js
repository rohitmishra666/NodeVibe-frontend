import axios from "axios";

export class User {

    async register(data) {
        try {
            console.log("register :: data", data)
            return await axios.post(import.meta.env.VITE_USER_URL + "/register",
                {
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    avatar: data.avatar[0],
                    coverImage: data.coverImage[0]
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                })
        } catch (error) {
            console.log("register :: error", error)
        }
    }

    async login({ email, password }) {
        try {
            return await axios.post(import.meta.env.VITE_USER_URL + "/login",
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
        } catch (error) {
            console.log("login :: error", error)
        }
    }

    async logout() {
        return axios.post(
            import.meta.env.VITE_USER_URL + "/logout",
            {},
            {
                withCredentials: true,
            }
        );
    }

    async refreshToken({ refreshToken }) {
        try {
            return axios.post(
                import.meta.env.VITE_USER_URL + "/refresh-token",
                {
                    refreshToken: refreshToken
                },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("refreshToken :: error", error)
        }
    }

    async changePassword({ oldPassword, newPassword }) {
        try {
            return axios.post(
                import.meta.env.VITE_USER_URL + "/change-password",
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("changePassword :: error", error)
        }
    }

    async getUser() {
        try {
            return axios.get(
                import.meta.env.VITE_USER_URL + "/current-user",
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("getUser :: error", error)
        }
    }

    async updateUser({ fullName, username }) {
        try {
            return axios.patch(
                import.meta.env.VITE_USER_URL + "/update",
                {
                    fullName: fullName,
                    username: username
                },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("updateUser :: error", error)
        }
    }

    async updateAvatar({ avatar }) {
        try {
            return axios.patch(
                import.meta.env.VITE_USER_URL + "/avatar",
                {
                    avatar: avatar
                },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("updateAvatar :: error", error)
        }
    }

    async updateCoverImage({ coverImage }) {
        try {
            return axios.patch(
                import.meta.env.VITE_USER_URL + "/cover-image",
                {
                    coverImage: coverImage
                },
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("updateCoverImage :: error", error)
        }
    }

    async getUserChannelProfile({ username }) {
        try {
            return axios.get(
                import.meta.env.VITE_USER_URL + `/c/${username}`,
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("getUserChannelProfile :: error", error)
        }
    }

    async getUserWatchHistory(){
        try {
            return axios.get(
                import.meta.env.VITE_USER_URL + "/history",
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("getUserWatchHistory :: error", error)
        }
    }
}

const user = new User();
export default user;