import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const iconStyle = {
        height: "40px",
        width: "40px",
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
                {userStatus && <button
                    onClick={() => {
                        if (userStatus) {
                            navigate(`/channel/${userData.username}/home`)
                        } else {
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
                </button>}
            </div>
            <div className="mb-8">
                <button
                    onClick={() => {
                        if (userStatus) {
                            navigate('/settings')
                        } else {
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
