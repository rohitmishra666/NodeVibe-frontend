import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../store/authSlice';
import userUtils from '../../utils/user.utils';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const iconStyle = {
        height: "40px",
        width: "40px",
    };

    const logoutHandler = async () => {
        const response = await userUtils.logout();
        if (!response) {
            throw new Error("Failed to logout!");
        }
        dispatch(logout());
        navigate("/");
        toast.success("Logged out successfully");
    };

    return (
        <div className="flex flex-col items-center justify-between w-16 h-screen fixed bg-gray-900">
            <div className="flex flex-col items-center mt-4 space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center h-16 text-white">
                    <lord-icon
                        src="https://cdn.lordicon.com/cnpvyndp.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={iconStyle}>
                    </lord-icon>
                </button>
                <button
                    onClick={() => {
                        if (userStatus) {
                            navigate('/like');
                        } else {
                            navigate('/login');
                            toast.error('Please login view liked videos');
                        }
                    }}
                    className="flex items-center justify-center h-16 text-white">
                    <lord-icon
                        src="https://cdn.lordicon.com/xyboiuok.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={iconStyle}>
                    </lord-icon>
                </button>
                <button
                    onClick={() => {
                        if (userStatus) {
                            navigate('/watchHistory')
                        } else {
                            navigate('/login');
                            toast.error('Please login to view watch history')
                        }
                    }}
                    className="flex items-center justify-center h-16 text-white">
                    <lord-icon
                        src="https://cdn.lordicon.com/vuiggmtc.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={iconStyle}>
                    </lord-icon>
                </button>
                {userStatus &&
                    <button
                        onClick={() => {
                            if (userStatus) {
                                navigate(`/channel/${userData.username}/home`)
                            } else {
                                navigate('/login');
                                toast.error('Please login to view your channel')
                            }
                        }}
                        className="flex items-center justify-center h-16 text-white">
                        <lord-icon
                            src="https://cdn.lordicon.com/tdxypxgp.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={iconStyle}>
                        </lord-icon>
                    </button>
                }
                {userStatus &&
                    <button
                        onClick={logoutHandler}
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/gwvmctbb.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#ffffff"
                            style={iconStyle}>
                        </lord-icon>
                    </button>
                }
            </div>
            <div className="mb-8">
                <button
                    onClick={() => {
                        if (userStatus) {
                            navigate('/settings')
                        } else {
                            navigate('/login');
                            toast.error('Please login to view settings')
                        }
                    }}
                    className="flex items-center justify-center h-16 mb-20 text-white">
                    <lord-icon
                        src="https://cdn.lordicon.com/lecprnjb.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={iconStyle}>
                    </lord-icon>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
