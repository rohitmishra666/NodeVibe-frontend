import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userUtils from '@/utils/user.utils';
import { toast } from 'react-toastify';
import { updateUser } from '@/store/authSlice';

function Settings() {
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        fullName: userData?.fullName,
        email: userData?.email,
        avatar: userData?.avatar,
        coverImage: userData?.coverImage,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleEditPasswordClick = () => {
        setIsEditingPassword(!isEditingPassword);
    };
    const handleSaveClick = async () => {
        const loadingToastId = toast.loading("Updating user data...");
        try {
            if (!(user.avatar === userData.avatar)) {
                const response = await userUtils.updateAvatar({ avatar: user.avatar });
                dispatch(updateUser(response.data.data));
                toast.update(loadingToastId, { render: 'Avatar updated successfully', type: 'success', isLoading: false, autoClose: 5000 });
            }
            if (!(user.coverImage === userData.coverImage)) {
                const response = await userUtils.updateCoverImage({ coverImage: user.coverImage });
                dispatch(updateUser(response.data.data));
                toast.success('Cover image updated successfully')
                toast.dismiss(loadingToastId);
            }
            if (!(user.fullName === userData.fullName) || !(user.email === userData.email)) {
                const response = await userUtils.updateUser({ fullName: user.fullName, email: user.email });
                dispatch(updateUser(response.data.data.user));
                toast.success('User updated successfully')
                toast.dismiss(loadingToastId);
            }
            setIsEditing(false);
        } catch (error) {
            toast.update(loadingToastId, { render: 'Error updating user data', type: 'error', isLoading: false, autoClose: 5000 });
        }
    };

    const handleSavePasswordClick = async () => {
        if (passwords.newPassword === passwords.confirmNewPassword) {
            const loadingToastId = toast.loading("Updating password...");

            try {
                await userUtils.changePassword({
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword,
                });
                setPasswords({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                });
                setIsEditingPassword(false);
                toast.update(loadingToastId, { render: 'Password changed successfully', type: 'success', isLoading: false, autoClose: 5000 });
            } catch (error) {
                toast.update(loadingToastId, { render: 'Error changing password', type: 'error', isLoading: false, autoClose: 5000 });
            }
        } else {
            toast.error('Passwords do not match');
        }
    };

    const handleImageChange = (e, type) => {
        setUser({ ...user, [type]: e.target.files[0] });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Settings</h2>
            <div className="mb-6">
                <div className="relative flex flex-col items-center">
                    <img src={user.coverImage} alt="Cover" className="w-full h-40 object-cover rounded-lg" />
                    {isEditing && (
                        <button
                            className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 p-1 rounded-full hover:bg-gray-400 focus:outline-none"
                            onClick={() => coverInputRef.current.click()}
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                trigger="hover"
                                colors="primary:#f4f19c,secondary:#ee6d66"
                                style={{ width: '30px', height: '30px' }}
                            ></lord-icon>
                        </button>
                    )}
                    <input
                        type="file"
                        ref={coverInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageChange(e, 'coverImage')}
                    />
                    <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-blue-600 -mt-12" />
                    {isEditing && (
                        <button
                            className="absolute bottom-4 bg-gray-500 bg-opacity-75 p-1 rounded-full hover:bg-gray-700 focus:outline-none transform translate-x-1/2 translate-y-1/2"
                            onClick={() => avatarInputRef.current.click()}
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                trigger="hover"
                                colors="primary:#f4f19c,secondary:#ee6d66"
                                style={{ width: '30px', height: '30px' }}
                            ></lord-icon>
                        </button>
                    )}
                    <input
                        type="file"
                        ref={avatarInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageChange(e, 'avatar')}
                    />
                </div>
            </div>
            {!isEditingPassword ? (
                <>
                    <div className="mb-6">
                        <label className="block text-white">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-2 border rounded mt-1 ${isEditing ? 'bg-white' : 'bg-gray-600 text-gray-200'}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full p-2 border rounded mt-1 ${isEditing ? 'bg-white' : 'bg-gray-600 text-gray-200'}`}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-6">
                        <label className="block text-white">Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={passwords.confirmNewPassword}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                </>
            )}
            <div className="flex justify-between mt-4">
                {!isEditingPassword && (
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                )}
                {isEditing && (
                    <button
                        onClick={handleSaveClick}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2"
                    >
                        Save
                    </button>
                )}
                {!isEditing && (
                    <button
                        onClick={handleEditPasswordClick}
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 ml-2"
                    >
                        {isEditingPassword ? 'Cancel' : 'Edit Password'}
                    </button>
                )}
                {isEditingPassword && (
                    <button
                        onClick={handleSavePasswordClick}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2"
                    >
                        Save Password
                    </button>
                )}
            </div>
        </div>
    );
}

export default Settings;
