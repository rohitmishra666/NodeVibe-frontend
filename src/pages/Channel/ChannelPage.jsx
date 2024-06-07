import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import userUtils from '../../utils/user.utils.js';
import { useParams } from 'react-router-dom';
import Subscribe from '../../components/VideoPlayer/Subscribe.jsx';

function ChannelPage() {
    const { username } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userUtils.getUserChannelProfile({ username });
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [username]);

    return (
        <div className="flex flex-col items-center">
            {/* Cover Photo */}
            <div className="w-full h-60 bg-gray-200">
                <img
                    src={user.coverImage}
                    alt="Cover Photo"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Avatar and Channel Info */}
            <div className="flex items-center justify-between w-full p-4">
                <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-full bg-gray-300">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-50">{user.username}</h1>
                        <p className="text-gray-300">{user.subscribersCount} subscribers</p>
                    </div>
                </div>
                <Subscribe channelId={user._id} />
            </div>

            {/* Navigation Tabs */}
            <div className="w-full border-b border-gray-300">
                <nav className="flex justify-center space-x-6">
                    <NavLink
                        to="home"
                        className={({ isActive }) =>
                            isActive ? "text-white border-b-2 border-white py-2" : "py-2 text-zinc-400"
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to={`playlist/${user._id}`}
                        className={({ isActive }) =>
                            isActive ? "text-white border-b-2 border-white py-2" : "py-2 text-zinc-400"
                        }
                    >
                        PLAYLIST
                    </NavLink>

                </nav>
            </div>

            {/* Content */}
            <div className="w-full p-4">
                <Outlet />
            </div>
        </div>
    );
}

export default ChannelPage;
