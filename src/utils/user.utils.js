import axios from "axios";

export class User {

    async register(data) {
        try {
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
            return error;
        }
    }

    async logout() {
        try {
            return await axios.post(
                import.meta.env.VITE_USER_URL + "/logout",
                {},
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("logout :: error", error)
        }
    }

    async refreshToken({ refreshToken = "" }) {
        try {
            return await axios.post(
                import.meta.env.VITE_USER_URL + "/refresh-token",
                {},
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            // console.log("refreshToken :: error", error)
            return error
        }
    }

    async changePassword({ oldPassword, newPassword }) {
        try {
            return await axios.post(
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
            return await axios.get(
                import.meta.env.VITE_USER_URL + "/current-user",
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("getUser :: error", error)
        }
    }

    async updateUser({ fullName, email }) {
        try {
            return await axios.patch(
                import.meta.env.VITE_USER_URL + "/update-account",
                {
                    fullName: fullName,
                    email: email
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("updateUser :: error", error)
        }
    }

    async updateAvatar({ avatar }) {
        try {
            console.log("updateAvatar :: data", avatar)
            return await axios.patch(
                import.meta.env.VITE_USER_URL + "/avatar",
                {
                    avatar: avatar
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("updateAvatar :: error", error)
        }
    }

    async updateCoverImage({ coverImage }) {
        try {
            return await axios.patch(
                import.meta.env.VITE_USER_URL + "/cover-image",
                {
                    coverImage: coverImage
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("updateCoverImage :: error", error)
            return error;
        }
    }

    async getUserChannelProfile({ username }) {
        try {
            return await axios.get(
                import.meta.env.VITE_USER_URL + `/c/${username}`,
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("getUserChannelProfile :: error", error)
        }
    }

    async getUserWatchHistory() {
        try {
            return await axios.get(
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