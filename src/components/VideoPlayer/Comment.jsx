import React, { useState } from 'react';
import { timeAgo } from '@/utils/timeAgo.utils';
import { useSelector } from 'react-redux';
import like from '@/utils/like.utils';
import comments from '@/utils/comment.utils';
import { useNavigate } from 'react-router-dom';

function Comment({ comment, thumbnail, username, time, id, setCommentUpdater }) {
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const [likeStatus, setLikeStatus] = useState(false);

    const likeComment = async (id) => {
        const response = await like.toggleCommentLike({
            commentId: id
        });
        setLikeStatus(response.data.data.liked);
    };

    const deleteComment = async (id) => {
        const response = await comments.deleteComment({
            commentId: id
        });
        setCommentUpdater(prev => !prev);
    };

    return (
        <div className="my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
            <img
                onClick={() => navigate(`/channel/${username}/home`)}
                className="mr-5 block cursor-pointer h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16 rounded-full" src={thumbnail} alt="Profile Picture" />
            <div className="w-full text-left">
                <div className="mb-2 flex flex-col sm:flex-row">
                    <h3
                        onClick={() => navigate(`/channel/${username}/home`)}
                        className="font-medium text-white cursor-pointer">@{username}</h3>
                    <p className="text-gray-200 text-sm ml-auto">{timeAgo(time)}</p>
                </div>
                <p className="text-base text-white">{comment}</p>
                <div className="mt-5 flex items-center justify-start gap-1 text-gray-600">
                    <button
                        onClick={() => likeComment(id)}
                        className="group flex cursor-pointer items-center justify-around"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 rounded-full p-1   ${likeStatus ? 'text-red-500 fill-red-500' : 'group-hover:text-red-500 text-white fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    {userData.username === username && (<button
                        onClick={() => deleteComment(id)}
                        className="group flex cursor-pointer items-center justify-around text-gray-600 group-hover:text-red-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full p-1 text-white fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Comment;
